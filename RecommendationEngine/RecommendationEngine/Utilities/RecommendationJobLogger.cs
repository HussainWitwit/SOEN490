using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;

namespace RecommendationEngine.Utilities
{
    public class RecommendationJobLogger : IRecommendationJobLogger
    {
        private IRecommendationJobLogRepository _jobLogRepository;
        public RecommendationJobLogger(IRecommendationJobLogRepository jobLogRepository)
        {
            _jobLogRepository = jobLogRepository;
        }
        private void Log(DBRecommendationJob job, string message, string level)
        {
            _jobLogRepository.Log(job, message, level);
        }
        public void LogWarn(DBRecommendationJob job, string message)
        {
            this.Log(job, message, "Warning");
        }
        public void LogInformation(DBRecommendationJob job, string message)
        {
            this.Log(job, message, "Information");
        }
        public void LogError(DBRecommendationJob job, string message)
        {
            this.Log(job, message, "Error");
        }
        public void LogFatal(DBRecommendationJob job, string message)
        {
            this.Log(job, message, "Fatal");
        }
    }
}