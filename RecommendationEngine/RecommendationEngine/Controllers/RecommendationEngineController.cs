using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.RecommendationEngineServices;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecommendationEngineController : ControllerBase
    {
        private RecommendationEngineService _recommendationEngineService;

        public RecommendationEngineController(RecommendationEngineService recommendationEngineService)
        {
            _recommendationEngineService = recommendationEngineService;
        }
    }
}
