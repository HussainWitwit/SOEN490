using Interfaces.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class AssetMetadataService
    {
        private IDriveService _driveService;

        public AssetMetadataService(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
