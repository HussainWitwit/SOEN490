using System;
using Microsoft.AspNetCore.Mvc;
using Interfaces.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecommendationTypeController : ControllerBase
    {

        private IRecommendationTypeService _recommendationTypeService;

        public RecommendationTypeController(IRecommendationTypeService recommendationTypeService)
        {
            _recommendationTypeService = recommendationTypeService;
        }

        [HttpGet]
        public IActionResult GetRecommendationTypes() {
            return Ok(_recommendationTypeService.GetRecommendationTypes());
        }
    }
}
