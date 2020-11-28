using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private EventService _eventService;

        public EventController(EventService eventService)
        {
            _eventService = eventService;
        }
    }
}