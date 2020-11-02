using Interfaces.Repositories;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class TestRepository: ITestRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public TestRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public string[] GetSummaries()
        {
            return new[]
            {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };
        }
    }
}
