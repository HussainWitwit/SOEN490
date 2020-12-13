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
        private IConfiguredRecommendationService _configuredRecommendationService;

        public ConfiguredRecommendationController(IConfiguredRecommendationService configuredRecommendationService)
        {
            _configuredRecommendationService = configuredRecommendationService;
        }

        [HttpGet("get")]
        public IActionResult GetConfiguredRecommendationList()
        {
            return Ok(_configuredRecommendationService.GetConfiguredRecommendationList());
        }

        [HttpPost("add")]
        public IActionResult AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            try
            {
                _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation);
            }
            catch (GlobalException e)
            {
                return BadRequest(e);
            }
            return Ok();
        }
    }
}
