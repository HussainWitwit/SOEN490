﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Models.Application;
using RecommendationEngine.ConfiguredRecommendationServices;

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
                return BadRequest(new {e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
            return Ok();
        }
    }
}
