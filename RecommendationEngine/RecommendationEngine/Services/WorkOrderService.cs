using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.WorkOrderServices
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
