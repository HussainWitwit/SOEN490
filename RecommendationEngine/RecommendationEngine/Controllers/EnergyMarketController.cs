using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnergyMarketController : ControllerBase
    {
        private EnergyMarketService _energyMarketService;

        public EnergyMarketController(EnergyMarketService energyMarketService)
        {
            _energyMarketService = energyMarketService;
        }
    }
}
