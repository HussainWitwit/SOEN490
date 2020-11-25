using Interfaces.Repositories;
using Interfaces.Services.ExternalAPI;

namespace Interfaces.Services
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
