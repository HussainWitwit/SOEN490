using Models.Application.APIModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Interfaces.Services.ExternalAPI
{
    public interface IDriveService
    {
        public Task<List<PFPortfolio>> GetPortfolios();
        public Task<List<PFPortfolio>> GetPlants();
        public Task<PFPlant> GetPlantById(string plantId);
        public Task<List<PFPPAPrice>> GetPPAPriceByPlantId(string plantId);
        public Task<List<PFMetadata>> GetAssetsMetadataByPlantIds(List<string> plantIds);
        public Task<Dictionary<string, List<PFPredictedEnergy>>> GetDailyPredictedEnergyByPlantIds(DateTime startTime, DateTime endTime, List<string> plantIds);
    }
}