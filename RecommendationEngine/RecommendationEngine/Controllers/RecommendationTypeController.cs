using System;
using Microsoft.AspNetCore.Mvc;
using Interfaces.Services;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationTypeController : ControllerBase
    {

        private readonly IRecommendationTypeService _recommendationTypeService;

        public RecommendationTypeController(IRecommendationTypeService recommendationTypeService)
        {
            _recommendationTypeService = recommendationTypeService;
        }

        [HttpGet]
        public IActionResult GetRecommendationTypes() {
            try
            {
                return Ok(_recommendationTypeService.GetRecommendationTypes());
            }
            catch (GlobalException e) {
                return e.GetActionResult();
            }
        }
    }
}
