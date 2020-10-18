using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class ActionService
    {
        private IDriveService _driveService;

        public ActionService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
