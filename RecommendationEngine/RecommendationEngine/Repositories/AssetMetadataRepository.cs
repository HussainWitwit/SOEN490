using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class AssetMetadataRepository : IAssetMetadataRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public AssetMetadataRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
