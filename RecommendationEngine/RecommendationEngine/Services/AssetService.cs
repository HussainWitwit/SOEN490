using System.Collections.Generic;
using Interfaces.Services;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using Interfaces.Repositories;
using Models.Application.Asset;

namespace RecommendationEngine.Services {

        public class AssetService : IAssetService 
        {

                private IDriveService _driveService;
                private IAssetRepository _repository;

                public AssetService(
                        IDriveService driveService,
                        IAssetRepository repository
                ) {
                        _driveService = driveService;
                        _repository = repository;
                }

                public AssetComposite GetAssets() {
                        //assets = _repository.Get();
                        //AssetMetadataService.children = ;
                        return new AssetComposite();
                }

                public AssetLeaf GetAssetByName(string assetName) {
                        var asset = _repository.GetAssetByName(assetName);
                        var assetleaf = new AssetLeaf {
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
        }
}
