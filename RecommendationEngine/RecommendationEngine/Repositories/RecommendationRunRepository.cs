using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class RecommendationRunRepository : IRecommendationRunRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationRunRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
