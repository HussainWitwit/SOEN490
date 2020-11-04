using Interfaces.Repositories;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class PortfolioRepository: IPortfolioRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public PortfolioRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
