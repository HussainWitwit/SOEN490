using Interfaces.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class TimeSeriesDataService
    {
        private IDriveService _driveService;

        public TimeSeriesDataService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
