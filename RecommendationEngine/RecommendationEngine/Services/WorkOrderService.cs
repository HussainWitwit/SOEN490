using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class WorkOrderService
    {
        private IDriveService _driveService;

        public WorkOrderService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
