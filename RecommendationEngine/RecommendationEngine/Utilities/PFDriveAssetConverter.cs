using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngine.Services.ExternalAPI.APIModels;

namespace RecommendationEngine.Utilities
{
    public class PFDriveAssetConverter
    {
        private IDriveService _driveService;

        public PFDriveAssetConverter(IDriveService driveService)
        {
            _driveService = driveService;
        }
    }
}
