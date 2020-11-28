using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class CaseRepository : ICaseRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public CaseRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
