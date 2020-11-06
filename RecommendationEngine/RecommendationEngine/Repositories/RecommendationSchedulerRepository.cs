using System.Linq;
using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class RecommendationSchedulerRepository: IRecommendationSchedulerRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationSchedulerRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public DBRecommendationJob GetDbRecommendationJobById(int id)
        {
            return _recommendationEngineDb.RecommendationJobs.FirstOrDefault(x => x.RecommendationJobId == id);
        }

        public DBRecommendationSchedule GetDbRecommendationScheduleById(int id)
        {
            return _recommendationEngineDb.RecommendationSchedules.Include(x=>x.RecommendationType).FirstOrDefault(x =>
                x.RecommendationScheduleId == id);
        }
    }
}
