using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecommendationSchedulerController : ControllerBase
    {
        private RecommendationSchedulerService _recommendationSchedulerService;

        public RecommendationSchedulerController(RecommendationSchedulerService recommendationSchedulerService)
        {
            _recommendationSchedulerService = recommendationSchedulerService;
        }
    }
}
