using System.Threading.Tasks;

namespace RecommendationEngine.Services.ExternalAPI
{
    public interface IDriveService
    {
        public Task<string> GetPortfolios();
        public Task<string> GetPlants();
        public void GetPlantByPortfolioId(string portfolioId);
    }
}