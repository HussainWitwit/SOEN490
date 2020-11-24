using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Services;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class ActionService: IActionService
    {
        private IDriveService _driveService;
        private IActionRepository _actionRepository;

        public ActionService(IDriveService driveService, IActionRepository actionRepository)
        {
            _driveService = driveService;
            _actionRepository = actionRepository;
        }
    }
}
