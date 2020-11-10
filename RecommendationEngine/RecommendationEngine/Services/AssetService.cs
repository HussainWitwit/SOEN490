using System;
using System.Linq;
using System.Collections.Generic;
using Interfaces.Services;
using Models.DB;
using Interfaces.Repositories;
using Models.Application.Asset;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI.APIModels;
using Interfaces.Services.ExternalApi;

namespace RecommendationEngine.Services
{

    public class AssetService : IAssetService
    {
        private IDriveService _driveService;
        private IAssetRepository _assetRepository;
        private IAssetTypeRepository _assetTypeRepository;
        private List<DBAsset> _assets;
        private DBAssetType _portfolioAssetType;
        private DBAssetType _plantAssetType;

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
            _portfolioAssetType = _assetTypeRepository.GetAssetTypeByName("Portfolio");
            _plantAssetType = _assetTypeRepository.GetAssetTypeByName("Plant");
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
            GetDBAssets();
            DBAsset asset = _assetRepository.GetAssetByName(assetName);
            return GetAssetCompositeFromDBAsset(asset);
        }

        public async Task Convert()
        {
            var portfolios = await _driveService.GetPortfolios();
            var plants = await _driveService.GetPlants();

            List<DBAsset> result = new List<DBAsset>();
            List<PFPortfolio> listOfPortfolios = portfolios.ToList();
            List<PFPortfolio> listOfPlants = plants.ToList();

            DBAsset client = GetClient(listOfPortfolios);

            result.Add(client);
            _assetRepository.AddAsset(client);

            List<DBAsset> parentDBAssets = BuildAssets(listOfPortfolios, true, client);
            _assetRepository.AddAssetList(parentDBAssets);

            List<DBAsset> childDBAssets = BuildAssets(listOfPlants, false, client);
            _assetRepository.AddAssetList(childDBAssets);
        }

        private List<DBAsset> GetDBAssets()
        {
            if (_assets != null)
            {
                return _assets;
            }
            return _assets = _assetRepository.Get();
        }

        private List<AssetComposite> GetChildren(int assetId)
        {
            GetDBAssets();
            List<DBAsset> children = _assets.FindAll(a =>
                {
                    if (a.ParentAsset != null)
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
            PFPlant plant;
            List<DBAsset> assetList = plants
                .Select(x =>
                {
                    plant = Task.Run(() => { return GetPlantByPortfolioId(x.Id); }).Result;

                    return new DBAsset()
                    {
                        Name = x.Id,
                        ElementPath = x.Id,
                        DisplayText = string.IsNullOrEmpty(x.Name) ? x.Id : x.Name,
                        EnergyType = null, //we need the assetmetada API to populate this (null for now)
                        Type = isPortfolio ? _portfolioAssetType : _plantAssetType,
                        TimeZone = isPortfolio ? null : plant.TimeZone,
                        AcPower = isPortfolio ? -1 : plant.AcCapacity,
                        ParentAsset = isPortfolio ? client : GetParentAsset(x.Id)
                    };
                }
                ).ToList();

            return assetList;
        }

        private async Task<PFPlant> GetPlantByPortfolioId(string id)
        {
            PFPlant plant = await _driveService.GetPlantByPortfolioId(id);
            return plant;
        }

        private DBAsset GetParentAsset(string id)
        {
            var parentId = Task.Run(() => { return GetParentId(id); }).Result;
            return _assetRepository.GetAssetByName(parentId);
        }

        private string GetParentId(string id)
        {
            string parentId = Task.Run(() => { return GetPlantByPortfolioId(id); }).Result.PortfolioId;
            return parentId;
        }
    }
}