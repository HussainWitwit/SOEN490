using Interfaces.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class RecommendationEngineService
    {
        private IDriveService _driveService;

        public RecommendationEngineService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
