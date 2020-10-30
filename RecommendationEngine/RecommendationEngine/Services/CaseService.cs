using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.CaseService
{
    public class CaseService
    {
        private IDriveService _driveService;

        public CaseService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
