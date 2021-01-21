using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models.Application.APIModels;

namespace Interfaces.Services.ExternalApi
{
    public interface IMetadataDriveService
    {
        public Task<List<PFPpaPrice>> GetPPAPriceByPlantId(string plantId);
        public Task<List<PFMetadata>> GetAssetsMetadataByPlantIds(List<string> plantIds);
        public Task<Dictionary<string, List<PFPredictedEnergy>>> GetDailyPredictedEnergyByPlantIds(DateTime startTime, DateTime endTime, List<string> plantIds);
    }
}