using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

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
