using Interfaces.Repositories;
using Interfaces.Services;
using Interfaces.Services.ExternalAPI;
using Models.Application.APIModels;
using Models.Application.Asset;
using Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

            List<PFPortfolio> listOfPortfolios = portfolios.ToList();
            List<PFPortfolio> listOfPlants = plants.ToList();

            DBAsset client = GetClient(listOfPortfolios);

            _assetRepository.AddAsset(client);

            List<DBAsset> parentDBAssets = await BuildAssets(listOfPortfolios, true, client);
            _assetRepository.AddAssetList(parentDBAssets);

            List<DBAsset> childDBAssets = await BuildAssets(listOfPlants, false, client);
            _assetRepository.AddAssetList(childDBAssets);
        }

        private List<DBAsset> GetDBAssets()
        {
            if (_assets != null)
            {
                return _assets;
            }
            return _assets = _assetRepository.GetAssetsList();
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
                AcPower = !Double.IsNaN(dbasset.AcPower) ? dbasset.AcPower : 0,
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
                    Name = x,
                    DisplayText = x
                })
                .FirstOrDefault();

            return client;
        }

        private async Task<List<DBAsset>> BuildAssets(List<PFPortfolio> assets, bool isPortfolio, DBAsset client)
        {
            Dictionary<string, dynamic> assetsEnergyTypes = new Dictionary<string, dynamic>();

            if (!isPortfolio)
            {
                List<string> assetIds = assets.Select(asset => asset.Id).ToList();
                List<PFMetadata> assetsMetadata = await _driveService.GetAssetsMetadataByPlantIds(assetIds.ToList());
                assetsEnergyTypes = assetsMetadata.Select(assetMetadata =>
                    new { elementPath = assetMetadata.ElementPath, energyType = assetMetadata.Metadata["ENERGY_SOURCE"] })
                    .ToDictionary(asset => asset.elementPath, asset => asset.energyType);
            }

            PFPlant plant = new PFPlant();
            List<DBAsset> assetList = assets
                .Select(x =>
                {
                    if (!isPortfolio)
                    {
                        plant = Task.Run(() => { return GetPlantById(x.Id); }).Result;
                    }

                    return new DBAsset()
                    {
                        Name = x.Id,
                        ElementPath = x.Id,
                        DisplayText = !String.IsNullOrEmpty(x.Name) ? x.Name : x.Id,
                        EnergyType = isPortfolio ? null : assetsEnergyTypes.Where(asset => asset.Key == x.Id).FirstOrDefault().Value,
                        Type = isPortfolio ? _portfolioAssetType : _plantAssetType,
                        TimeZone = isPortfolio ? null : plant.TimeZone,
                        AcPower = isPortfolio ? 0 : plant.AcCapacity,
                        ParentAsset = isPortfolio ? client : GetParentAsset(x.Id)
                    };
                }
                ).ToList();

            return assetList;
        }

        private async Task<PFPlant> GetPlantById(string id)
        {

            PFPlant plant = await _driveService.GetPlantById(id);
            return plant;
        }

        private DBAsset GetParentAsset(string id)
        {
            var parentId = Task.Run(() => { return GetParentId(id); }).Result;
            return _assetRepository.GetAssetByName(parentId);
        }

        private string GetParentId(string id)
        {
            String parentId = Task.Run(() => { return GetPlantById(id); }).Result.PortfolioId;
            return parentId;
        }

        public List<AssetLeaf> GetAssetsList()
        {
            List<DBAsset> dbAssets = GetDBAssets();

            List<AssetLeaf> assets = dbAssets.Distinct().Where(dbasset => dbasset.Type != null).Select(dbasset => new AssetLeaf()
                {
                    Name = dbasset.Name,
                    Id = dbasset.AssetId,
                    AcPower = !Double.IsNaN(dbasset.AcPower) ? dbasset.AcPower : 0,
                    DisplayText = dbasset.DisplayText,
                    ElementPath = dbasset.ElementPath,
                    EnergyType = dbasset.EnergyType,
                    AssetType = dbasset.Type.Name,
                    TimeZone = dbasset.TimeZone,
                }
            ).ToList();

            return assets;
        }
    }
}