using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Repositories;
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
    }
}
