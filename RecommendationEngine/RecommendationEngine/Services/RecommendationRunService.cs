using Interfaces.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class RecommendationRunService
    {
        private IDriveService _driveService;

        public RecommendationRunService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
