using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class WorkOrderRepository : IWorkOrderRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public WorkOrderRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
