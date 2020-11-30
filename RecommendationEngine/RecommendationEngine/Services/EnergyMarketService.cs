using Interfaces.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class EnergyMarketService
    {
        private IDriveService _driveService;

        public EnergyMarketService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
