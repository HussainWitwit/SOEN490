using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class WeatherService
    {
        private IDriveService _driveService;

        public WeatherService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
