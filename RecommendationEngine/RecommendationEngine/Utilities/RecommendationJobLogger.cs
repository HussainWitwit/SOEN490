using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;
using Newtonsoft.Json;

namespace RecommendationEngine.Utilities
{
    public class RecommendationJobLogger : IRecommendationJobLogger
    {
        private IRecommendationJobLogRepository _jobLogRepository;
        public RecommendationJobLogger(IRecommendationJobLogRepository jobLogRepository)
        {
            _jobLogRepository = jobLogRepository;
        }
        private void Log(DBRecommendationJob job, string message, string level, object obj)
        {
            string jsonString = obj!=null ? JsonConvert.SerializeObject(obj,Formatting.None,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                }): "";
            _jobLogRepository.Log(job, message + " " + jsonString, level);
        }
        public void LogWarn(DBRecommendationJob job, string message, object obj)
        {
            this.Log(job, message, "Warning", obj);
        }
        public void LogInformation(DBRecommendationJob job, string message, object obj)
        {
            this.Log(job, message, "Information", obj);
        }
        public void LogError(DBRecommendationJob job, string message, object obj)
        {
            this.Log(job, message, "Error", obj);
        }
        public void LogFatal(DBRecommendationJob job, string message, object obj)
        {
            this.Log(job, message, "Fatal", obj);
        }
    }
}