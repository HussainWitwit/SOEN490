using Models.DB;

namespace Interfaces.Repositories
{
    public interface IRecommendationJobLogRepository
    {
        public void Log(DBRecommendationJob job, string message, string level);
    }
}