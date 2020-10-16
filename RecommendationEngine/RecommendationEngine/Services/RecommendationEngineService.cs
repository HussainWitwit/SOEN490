using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class RecommendationEngineService
    {
        private IDriveService _driveService;

        public RecommendationEngineService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
