using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class TimeSeriesDataService
    {
        private IDriveService _driveService;

        public TimeSeriesDataService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
