﻿using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ActionServices;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActionController: ControllerBase
    {
        private IActionService _actionService;
        public ActionController(IActionService actionService)
        {
            _actionService = actionService;
        }


        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = rng.Next(-20, 55),
                    Summary = _actionService.GetSummaries()[rng.Next(_actionService.GetSummaries().Length)]
                })
                .ToArray();
        }
    }
}
