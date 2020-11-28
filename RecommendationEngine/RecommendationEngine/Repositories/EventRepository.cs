using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class EventRepository : IEventRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public EventRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
