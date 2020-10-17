using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActionController: ControllerBase
    {
        private ActionService _actionService;
        public ActionController(ActionService actionService)
        {
            _actionService = actionService;
        }
    }
}
