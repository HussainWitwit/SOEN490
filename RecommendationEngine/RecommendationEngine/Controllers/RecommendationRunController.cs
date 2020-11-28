using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecommendationRunController : ControllerBase
    {
        private RecommendationRunService _recommendationRunService;

        public RecommendationRunController(RecommendationRunService recommendationRunService)
        {
            _recommendationRunService = recommendationRunService;
        }
    }
}
