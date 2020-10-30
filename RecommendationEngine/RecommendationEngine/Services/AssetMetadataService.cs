using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.AssetMetadataService
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
