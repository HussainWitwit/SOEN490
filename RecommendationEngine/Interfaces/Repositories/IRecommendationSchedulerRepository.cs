using Models.DB;

namespace Interfaces.Repositories
{
    public interface IRecommendationSchedulerRepository
    {
        public DBRecommendationJob GetDbRecommendationJobById(int id);
        public DBRecommendationSchedule GetDbRecommendationScheduleById(int id);
    }
}