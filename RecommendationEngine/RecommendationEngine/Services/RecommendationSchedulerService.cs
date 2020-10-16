using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class RecommendationSchedulerService
    {
        private IDriveService _driveService;

        public RecommendationSchedulerService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
