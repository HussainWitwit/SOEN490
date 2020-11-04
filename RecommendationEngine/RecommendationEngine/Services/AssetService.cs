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

        public AssetService(
                IDriveService driveService,
                IAssetRepository assetRepository,
                IAssetTypeRepository assetTypeRepository
        )
        {
            _driveService = driveService;
            _assetRepository = assetRepository;
            _assetTypeRepository = assetTypeRepository;
        }

        public AssetComposite GetAssets()
        {
            //assets = _repository.Get();
            //AssetMetadataService.children = ;
            return new AssetComposite();
        }

        public AssetLeaf GetAssetByName(string assetName)
        {
            var asset = _assetRepository.GetAssetByName(assetName);
            var assetleaf = new AssetLeaf
            {
                Name = asset.Name,
                Id = asset.AssetId,
                AcPower = asset.AcPower,
                DisplayText = asset.DisplayText,
                ElementPath = asset.ElementPath,
                EnergyType = asset.EnergyType,
                TimeZone = asset.TimeZone
            };

            return assetleaf;
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
