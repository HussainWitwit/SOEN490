using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class EnergyMarketService
    {
        private IDriveService _driveService;

        public EnergyMarketService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
