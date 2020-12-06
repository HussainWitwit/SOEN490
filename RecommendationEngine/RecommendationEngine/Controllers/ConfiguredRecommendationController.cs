using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfiguredRecommendationController : ControllerBase
    {
        private IConfiguredRecommendationService _recommendationSchedulerService;

        public ConfiguredRecommendationController(IConfiguredRecommendationService recommendationSchedulerService)
        {
            _recommendationSchedulerService = recommendationSchedulerService;
        }

        [HttpGet("get")]
        public IActionResult getConfiguredRecommendationList()
        {
            return Ok(_recommendationSchedulerService.GetConfiguredRecommendationList());
        }
    }
}
