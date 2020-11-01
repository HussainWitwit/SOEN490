using Interfaces.Repositories;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class RecommendationRunRepository: IRecommendationRunRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationRunRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
