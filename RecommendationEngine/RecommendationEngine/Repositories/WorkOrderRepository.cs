using Interfaces.Repositories;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class WorkOrderRepository: IWorkOrderRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public WorkOrderRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
