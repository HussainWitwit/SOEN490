using System.Collections.Generic;
using Interfaces.Services;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using Interfaces.Repositories;

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

                public List<DBAsset> GetAssets() {
                        return _repository.Get();
                }

                public DBAsset GetAssetById(int id) {
                        return _repository.GetAssetById(id);
                }
        }
}
