using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class TimeSeriesDataRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public TimeSeriesDataRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}
