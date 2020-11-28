using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActionController : ControllerBase
    {
        private IActionService _actionService;
        public ActionController(IActionService actionService)
        {
            _actionService = actionService;
        }
    }
}
