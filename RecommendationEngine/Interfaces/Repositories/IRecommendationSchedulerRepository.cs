using Models.DB;
using System.Collections.Generic;

namespace Interfaces.Repositories
{
    public interface IRecommendationSchedulerRepository
    {
        public DBRecommendationJob GetDbRecommendationJobById(int id);
        public DBRecommendationSchedule GetDbRecommendationScheduleById(int id);
        public List<DBRecommendationSchedule> GetDbRecommendationSchedules();
        public DBRecommendationJob AddRecommendationJob(DBRecommendationJob job);
        public void UpdateRecommendationJobStatus(int jobId, string status);
        public void UpdateRecommendationJobStatus(int jobId, string status, int jobDurationSeconds);
    }
}