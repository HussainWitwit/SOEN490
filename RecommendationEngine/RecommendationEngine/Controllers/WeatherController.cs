using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherController : ControllerBase
    {
        private WeatherService _weatherService;

        public WeatherController(WeatherService weatherService)
        {
            _weatherService = weatherService;
        }
    }
}
