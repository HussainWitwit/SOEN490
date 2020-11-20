using System.Collections.Generic;
using System.Threading.Tasks;
using Models.Application.APIModels;

namespace Interfaces.Services.ExternalAPI
{
    public interface IDriveService
    {
        public Task<List<PFPortfolio>> GetPortfolios();
        public Task<List<PFPortfolio>> GetPlants();
        public Task<PFPlant> GetPlantByPortfolioId(string portfolioId);
        public double GetPredictedEnergy();
        public double GetEnergyPrice();
        public double GetDCCapacity();
    }
}