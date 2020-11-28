using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class ActionRepository : IActionRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ActionRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
