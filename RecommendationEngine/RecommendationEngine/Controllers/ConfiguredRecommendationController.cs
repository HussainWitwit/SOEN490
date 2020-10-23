using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Models.Application;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfiguredRecommendationController : ControllerBase
    {
        private ConfiguredRecommendationService _recommendationSchedulerService;

        public ConfiguredRecommendationController(ConfiguredRecommendationService recommendationSchedulerService)
        {
            _recommendationSchedulerService = recommendationSchedulerService;
        }

        [HttpGet("get")]
        public IActionResult getConfiguredRecommendationList() {
            return Ok(_recommendationSchedulerService.getConfiguredRecommendationList());
        }

        [HttpPost("add")]
        public IActionResult addConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation) {
            try {
                _recommendationSchedulerService.addConfiguredRecommendation(configuredRecommendation);
            }
            catch (GlobalException e) {
                return BadRequest(e);
            }
            return Ok();
        }
    }
}
