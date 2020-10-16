using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class EventService
    {
        private IDriveService _driveService;

        public EventService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
