using System.Collections.Generic;
using System.Threading.Tasks;
using RecommendationEngine.Services.ExternalAPI.APIModels;

namespace RecommendationEngine.Services.ExternalAPI
{
    public interface IDriveService
    {
        public Task<List<PFPortfolio>> GetPortfolios();
        public Task<List<PFPortfolio>> GetPlants();
        public Task<PFPlant> GetPlantByPortfolioId(string portfolioId);
    }
}