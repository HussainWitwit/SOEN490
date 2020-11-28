using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class RecommendationEngineRepository : IRecommendationEngineRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationEngineRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
