using Interfaces.Services.ExternalAPI;

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
