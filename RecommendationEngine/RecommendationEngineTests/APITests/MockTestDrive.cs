using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using Models.Application.APIModels;

namespace RecommendationEngineTests.APITests
{
    public class MockTestDrive : IMetadataDriveService, IAssetDriveService
    {
        public async Task<List<PFPortfolio>> GetPortfolios()
        {
            await Task.Delay(1);
            return UnitTests.MockData.MockAssets.BasicPortfolios;
        }
        public async Task<List<PFPortfolio>> GetPlants()
        {
            await Task.Delay(1);
            return UnitTests.MockData.MockAssets.BasicPlants;
        }

        public async Task<PFPlant> GetPlantById(string plantId)
        {
            await Task.Delay(1);
            return UnitTests.MockData.MockAssets.BasicPlant;
        }

        public async Task<List<PFPPAPrice>> GetPPAPriceByPlantId(string plantId)
        {
            await Task.Delay(1);
            return new List<PFPPAPrice>();
        }
        public async Task<List<PFMetadata>> GetAssetsMetadataByPlantIds(List<string> plantIds)
        {
            await Task.Delay(1);
            return new List<PFMetadata>();
        }
        public async Task<Dictionary<string, List<PFPredictedEnergy>>> GetDailyPredictedEnergyByPlantIds(DateTime startTime, DateTime endTime, List<string> plantIds)
        {
            await Task.Delay(1);
            return new Dictionary<string, List<PFPredictedEnergy>>();
        }

    }
}
