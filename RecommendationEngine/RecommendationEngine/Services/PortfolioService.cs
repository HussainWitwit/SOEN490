using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.PortfolioService
{
    public class PortfolioService
    {
        private IDriveService _driveService;

        public PortfolioService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
