using System.Linq;
using Models.DB;
using Interfaces.Repositories;
using System.Collections.Generic;

namespace RecommendationEngine.Repositories {
        public class AssetRepository : IAssetRepository {
                private RecommendationEngineDBContext _recommendationEngineDb;

                public AssetRepository(RecommendationEngineDBContext recommendationEngineDb) {
                        _recommendationEngineDb = recommendationEngineDb;
                }

                public List<DBAsset> Get() {
                        return _recommendationEngineDb.Assets.ToList();
                }

                public DBAsset GetAssetById(int id) {
                        return _recommendationEngineDb.Assets.FirstOrDefault(a => a.AssetId == id);
                }
        }
}
