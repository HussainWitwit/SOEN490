using System;
using System.Collections.Generic;
using System.Linq;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngine.Services.ExternalAPI.APIModels;

namespace RecommendationEngine.Utilities
{
    public class PFDriveAssetConverter
    {
        private IDriveService _driveService;

        public PFDriveAssetConverter(IDriveService driveService) {
            _driveService = driveService;
        }

        public async void Convert() {
            var portfolios = await _driveService.GetPortfolios();
            var plants = await _driveService.GetPlants();
            var plant = await _driveService.GetPlantByPortfolioId("RENEW01_2070.93.005");

            List<PFPortfolio> listOfPortfolios = portfolios.ToList();
            List<PFPortfolio> listOfPlants = plants.ToList();
            
        }
    }
}
