using Interfaces.Repositories;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class RecommendationSchedulerRepository: IRecommendationSchedulerRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationSchedulerRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
