using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.EnergyMarketServices;

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
