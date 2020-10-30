using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.WorkOrderServices
{
    public class WorkOrderService
    {
        private IWorkOrderService _workOrderService;
        private RecommendationEngineDBContext _recommendationEngineRepository;

        public WorkOrderService(IWorkOrderService workOrderService, RecommendationEngineDBContext recommendationEngineRepository)
        {
            _workOrderService = workOrderService;
            _recommendationEngineRepository = recommendationEngineRepository;
        }
    }
}
