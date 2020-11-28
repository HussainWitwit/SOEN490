using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

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
