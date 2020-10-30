using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.RecommendationRunService
{
    public class RecommendationRunService
    {
        private IDriveService _driveService;

        public RecommendationRunService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
