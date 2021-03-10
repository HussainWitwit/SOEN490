using Interfaces.Repositories;
using Interfaces.Services;
using Models.Application.APIModels;
using Models.Application.Asset;
using Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Services
{
    public class AssetService : IAssetService
    {
        private readonly IAssetDriveService _assetDriveService;
        private readonly IAssetRepository _assetRepository;
        private readonly IAssetTypeRepository _assetTypeRepository;
        private readonly IMetadataDriveService _metadataDriveService;
        private List<DBAsset> _assets;
        private DBAssetType _portfolioAssetType;
        private DBAssetType _plantAssetType;

        public AssetService(
                IAssetDriveService assetDriveService,
                IAssetRepository assetRepository,
                IAssetTypeRepository assetTypeRepository,
                IMetadataDriveService metadataDriveService
        )
        {
            _assetDriveService = assetDriveService;
            _assetRepository = assetRepository;
            _assetTypeRepository = assetTypeRepository;
            _metadataDriveService = metadataDriveService;
        }

        public Asset GetAssetsTreeview()
        {
            try
            {
                GetDBAssets();
                _portfolioAssetType = _assetTypeRepository.GetAssetTypeByName("Portfolio");
                _plantAssetType = _assetTypeRepository.GetAssetTypeByName("Plant");
                DBAsset client = _assets.FirstOrDefault(a => a.ParentAsset == null);
                AssetComposite clientComposite = GetAssetCompositeFromDBAsset(client);
                return clientComposite;
            }
            catch (GlobalException)
            {
                throw;
            }
            catch(Exception)
            {
                throw new InternalServerException();
            }
            
        }

        public Asset GetAssetByName(string assetName)
        {
            try {
                GetDBAssets();
                DBAsset asset = _assetRepository.GetAssetByName(assetName);
                return GetAssetCompositeFromDBAsset(asset);
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception) {
                throw new InternalServerException();
            }
        }

        public async Task Convert()
        {
            try
            {
                var portfolios = await _assetDriveService.GetPortfolios();
                var plants = await _assetDriveService.GetPlants();

                List<PFPortfolio> listOfPortfolios = portfolios.ToList();
                List<PFPortfolio> listOfPlants = plants.ToList();

                DBAsset client = GetClient(listOfPortfolios);

                _assetRepository.AddAsset(client);

                List<DBAsset> parentDBAssets = await BuildAssets(listOfPortfolios, true, client);
                _assetRepository.AddAssetList(parentDBAssets);

                List<DBAsset> childDBAssets = await BuildAssets(listOfPlants, false, client);
                _assetRepository.AddAssetList(childDBAssets);
            }
            catch (GlobalException)
            {
                throw;
            }
            catch(Exception) {
                throw new InternalServerException();
            }
        }

        private List<DBAsset> GetDBAssets()
        {
            try
            {
                if (_assets != null)
                {
                    return _assets;
                }
                return _assets = _assetRepository.GetAssetsList();
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        private List<AssetComposite> GetChildren(int assetId)
        {
            try
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
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        private AssetComposite GetAssetCompositeFromDBAsset(DBAsset dbasset)
        {
            try {
                var assetComposite = new AssetComposite()
                {
                    Name = dbasset.Name,
                    Id = dbasset.AssetId,
                    AcPower = !Double.IsNaN(dbasset.AcPower) ? dbasset.AcPower : 0,
                    DisplayText = dbasset.DisplayText,
                    ElementPath = dbasset.ElementPath,
                    EnergyType = dbasset.EnergyType,
                    TimeZone = dbasset.TimeZone,
                    AssetType = dbasset.Type?.Name
                };

                assetComposite.Children = GetChildren(assetComposite.Id);

                return assetComposite;
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        private DBAsset GetClient(List<PFPortfolio> listOfPortfolios)
        {
            try
            {
                string clientName = listOfPortfolios
                    .Select(x => x.Id.Split(".")[0])
                    .FirstOrDefault();

                DBAsset client = _assetRepository.GetAssetByName(clientName);

                if (client != null)
                {
                    return client;
                }

                return new DBAsset()
                {
                    Name = clientName,
                    DisplayText = clientName
                };
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        private async Task<List<DBAsset>> BuildAssets(List<PFPortfolio> assets, bool isPortfolio, DBAsset client)
        {
            try
            {
                Dictionary<string, dynamic> assetsEnergyTypes = new Dictionary<string, dynamic>();

                if (!isPortfolio)
                {
                    List<string> assetIds = assets.Select(asset => asset.Id).ToList();
                    List<PFMetadata> assetsMetadata = await _metadataDriveService.GetAssetsMetadataByPlantIds(assetIds.ToList());
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
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        private async Task<PFPlant> GetPlantById(string id)
        {
            try
            {
                PFPlant plant = await _assetDriveService.GetPlantById(id);
                return plant;
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
            
        }

        private DBAsset GetParentAsset(string id)
        {
            try
            {
                var parentId = Task.Run(() => { return GetParentId(id); }).Result;
                return _assetRepository.GetAssetByName(parentId);
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        private string GetParentId(string id)
        {
            String parentId = Task.Run(() => { return GetPlantById(id); }).Result.PortfolioId;
            return parentId;
        }

        public List<AssetLeaf> GetAssetsList()
        {
            try
            {
                _portfolioAssetType = _assetTypeRepository.GetAssetTypeByName("Portfolio");
                _plantAssetType = _assetTypeRepository.GetAssetTypeByName("Plant");
                List<DBAsset> dbAssets = GetDBAssets();

                List<AssetLeaf> assets = dbAssets.Distinct().Select(dbasset => new AssetLeaf()
                {
                    Name = dbasset?.Name,
                    Id = dbasset.AssetId,
                    AcPower = !Double.IsNaN(dbasset.AcPower) ? dbasset.AcPower : 0,
                    DisplayText = dbasset?.DisplayText,
                    ElementPath = dbasset?.ElementPath,
                    EnergyType = dbasset?.EnergyType,
                    AssetType = dbasset.Type?.Name,
                    TimeZone = dbasset?.TimeZone,
                    ParentId = dbasset.ParentAsset?.AssetId

                }
                ).ToList();

                return assets;
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }
    }
}