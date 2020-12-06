using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Models.Application;
using RecommendationEngine.ExceptionHandler;

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

        [HttpPost("add")]
        public IActionResult addConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            try
            {
                _recommendationSchedulerService.AddConfiguredRecommendation(configuredRecommendation);
            }
            catch (GlobalException e)
            {
                return BadRequest(e);
            }
            return Ok();
        }
    }
}
