using Models.DB;

namespace Interfaces.Utilities
{
    public interface IRecommendationJobLogger
    {
        public void LogWarn(DBRecommendationJob job, string message);
        public void LogInformation(DBRecommendationJob job, string message);
        public void LogError(DBRecommendationJob job, string message);
        public void LogFatal(DBRecommendationJob job, string message);
    }
}