using System;
using Interfaces.Repositories;
using Interfaces.Services;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class RecommendationJobLogRepository: IRecommendationJobLogRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationJobLogRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public void Log(DBRecommendationJob job, String message, String level)
        {
            DBRecommendationJobLog log = new DBRecommendationJobLog
            {
                RecommendationJob =  job,
                Description = message,
                Level = level,
                Time = DateTime.Now
            };
            _recommendationEngineDb.Add(log);
            _recommendationEngineDb.SaveChanges();
        }
    }
}
