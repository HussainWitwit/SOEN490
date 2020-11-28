using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class CaseService
    {
        private IDriveService _driveService;

        public CaseService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
