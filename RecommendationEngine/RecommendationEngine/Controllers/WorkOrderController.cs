using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.WorkOrderServices;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkOrderController : ControllerBase
    {
        private WorkOrderService _workOrderService;

        public WorkOrderController(WorkOrderService workOrderService)
        {
            _workOrderService = workOrderService;
        }
    }
}
