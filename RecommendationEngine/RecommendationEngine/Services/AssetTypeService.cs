using System.Collections.Generic;
using Interfaces.Services;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using Interfaces.Repositories;

namespace RecommendationEngine.Services {

        public class AssetTypeService : IAssetTypeService {

                private IDriveService _driveService;
                private IAssetTypeRepository _repository;

                public AssetTypeService(
                        IDriveService driveService,
                        IAssetTypeRepository repository
                ) {
                        _driveService = driveService;
                        _repository = repository;
                }

                public DBAssetType GetAssetTypeByName(string assetTypeName) {
                        return _repository.GetAssetTypeByName(assetTypeName);
                }
        }
}
