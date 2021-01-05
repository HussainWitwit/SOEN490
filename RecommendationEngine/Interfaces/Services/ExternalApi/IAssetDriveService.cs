using System.Collections.Generic;
using System.Threading.Tasks;
using Models.Application.APIModels;

namespace Interfaces.Services.ExternalApi
{
    public interface IAssetDriveService
    {
        public Task<List<PFPortfolio>> GetPortfolios();
        public Task<List<PFPortfolio>> GetPlants();
        public Task<PFPlant> GetPlantById(string plantId);
    }
}