using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;
using Models.Application;
using RecommendationEngine.ConfiguredRecommendationServices;

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
            //TODO: Error handlind
            return Ok(_recommendationSchedulerService.getConfiguredRecommendationList());
        }
    }
}
