using Interfaces.Repositories;
using Interfaces.Services;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class ActionRepository: IActionRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ActionRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
