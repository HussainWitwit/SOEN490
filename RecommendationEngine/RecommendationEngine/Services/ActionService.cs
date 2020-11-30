using Interfaces.Repositories;
using Interfaces.Services;
using Interfaces.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class ActionService : IActionService
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
