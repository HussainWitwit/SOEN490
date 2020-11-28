using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class EnergyMarketRepository : IEnergyMarketRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public EnergyMarketRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
