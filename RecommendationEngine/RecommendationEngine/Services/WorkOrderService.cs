using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.WorkOrderService
{
    public class WorkOrderService
    {
        private IWorkOrderService _workOrderService;

        public WorkOrderService(IWorkOrderService workOrderService)
        {
            _workOrderService = workOrderService;
        }
    }
}
