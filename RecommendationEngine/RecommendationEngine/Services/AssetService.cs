using System;
using System.Linq;
using System.Collections.Generic;
using Interfaces.Services;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using Interfaces.Repositories;
using Models.Application.Asset;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI.APIModels;

namespace RecommendationEngine.Services
{

    public class AssetService : IAssetService
    {

        private IDriveService _driveService;
        private IAssetRepository _assetRepository;
        private IAssetTypeRepository _assetTypeRepository;
        private List<DBAsset> _assets;

        public AssetService(
                IDriveService driveService,
                IAssetRepository assetRepository,
                IAssetTypeRepository assetTypeRepository
        )
        {
            _driveService = driveService;
            _assetRepository = assetRepository;
            _assetTypeRepository = assetTypeRepository;
            GetDBAssets();
        }

        
        private List<DBAsset> GetDBAssets()
        {
            if (_assets != null)
            {
                return _assets;
            }
            return _assets = _assetRepository.Get();
        }

        public Asset GetAssetsTreeview()
        {
            GetDBAssets();
            DBAsset client = _assets.FirstOrDefault(a => a.ParentAsset == null);
            AssetComposite clientComposite = GetAssetCompositeFromDBAsset(client);
            return clientComposite;
        }

        public Asset GetAssetByName(string assetName)
        {
            _assets = _assetRepository.Get();
            DBAsset asset = _assetRepository.GetAssetByName(assetName);
            return GetAssetCompositeFromDBAsset(asset);
        }

        private List<AssetComposite> GetChildren(int assetId)
        {
            _assets = _assetRepository.Get();
            List<DBAsset> children = _assets.FindAll(a =>
                {
                    if(a.ParentAsset != null)
                    {
                        return a.ParentAsset.AssetId == assetId;
                    }
                    return false;
                });
            List<AssetComposite> childrenComposite = children
                    .Select(dbasset => GetAssetCompositeFromDBAsset(dbasset)).ToList();

            return childrenComposite;
        }

        private AssetComposite GetAssetCompositeFromDBAsset(DBAsset dbasset)
        {
            var assetComposite = new AssetComposite()
            {
                Name = dbasset.Name,
                Id = dbasset.AssetId,
                AcPower = dbasset.AcPower,
                DisplayText = dbasset.DisplayText,
                ElementPath = dbasset.ElementPath,
                EnergyType = dbasset.EnergyType,
                TimeZone = dbasset.TimeZone,
            };

            assetComposite.Children = GetChildren(assetComposite.Id);

            return assetComposite;
        }

        public async void Convert()
        {
            var portfolios = await _driveService.GetPortfolios();
            var plants = await _driveService.GetPlants();

            List<DBAsset> result = new List<DBAsset>();
            List<PFPortfolio> listOfPortfolios = portfolios.ToList();
            List<PFPortfolio> listOfPlants = plants.ToList();

            DBAsset client = GetClient(listOfPortfolios);

            result.Add(client);
            _assetRepository.AddSingleDBAsset(client);

            List<DBAsset> parentDBAssets = BuildAssets(listOfPortfolios, true, client);
            _assetRepository.AddDBAssetList(parentDBAssets);

            List<DBAsset> childDBAssets = BuildAssets(listOfPlants, false, client);
            _assetRepository.AddDBAssetList(childDBAssets);
        }

        private DBAsset GetClient(List<PFPortfolio> listOfPortfolios)
        {
            List<string> clientList = listOfPortfolios
                .Select(x => x.Id.Split(".")[0])
                .ToList();

            DBAsset client = clientList
                .Distinct()
                .Select(x => new DBAsset()
                {
                    Name = x
                })
                .FirstOrDefault();

            return client;
        }

        private List<DBAsset> BuildAssets(List<PFPortfolio> plants, bool isPortfolio, DBAsset client)
        {
            List<DBAsset> assetList = plants
                .Select(x => new DBAsset()
                {
                    Name = x.Id,
                    ElementPath = x.Id,
                    DisplayText = isPortfolio ? _assetTypeRepository.GetAssetTypeByName("Portfolio").DisplayText : _assetTypeRepository.GetAssetTypeByName("Plant").DisplayText,
                    EnergyType = isPortfolio ? _assetTypeRepository.GetAssetTypeByName("Portfolio").EnergyType : _assetTypeRepository.GetAssetTypeByName("Plant").EnergyType,
                    Type = isPortfolio ? _assetTypeRepository.GetAssetTypeByName("Portfolio") : _assetTypeRepository.GetAssetTypeByName("Plant"),
                    TimeZone = isPortfolio ? null : Task.Run(() => { return GetField(x.Id); }).Result,
                    AcPower = isPortfolio ? double.NaN : Task.Run(() => { return GetAcCapacity(x.Id); }).Result,
                    ParentAsset = isPortfolio ? client : GetParentAsset(x.Id)
                }).ToList();

            return assetList;
        }

        private DBAsset GetParentAsset(string id)
        {
            var parentId = Task.Run(() => { return GetParentId(id); }).Result;
            return _assetRepository.GetAssetByName(parentId);
        }

        private async Task<string> GetField(string id)
        {
            PFPlant energy = await _driveService.GetPlantByPortfolioId(id);
            return energy.TimeZone;
        }

        private async Task<double> GetAcCapacity(string id)
        {
            PFPlant energy = await _driveService.GetPlantByPortfolioId(id);
            return energy.AcCapacity;
        }

        private async Task<string> GetParentId(string id)
        {
            var plants = await _driveService.GetPlantByPortfolioId(id);
            return plants.PortfolioId;
        }
    }
}
