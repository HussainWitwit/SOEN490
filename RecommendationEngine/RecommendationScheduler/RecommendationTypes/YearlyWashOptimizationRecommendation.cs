using Interfaces.Utilities;
using Models.DB;

namespace RecommendationScheduler.RecommendationTypes
{
    public class YearlyWashOptimizationRecommendation: IRecommendationType
    {
        private IRecommendationJobLogger _jobLogger;
        public YearlyWashOptimizationRecommendation(IRecommendationJobLogger jobLogger)
        {
            _jobLogger = jobLogger;
        }
        public void ExecuteAlgorithm(DBRecommendationJob job)
        {
            _jobLogger.LogInformation(null, "Starting Yearly Wash Optimization Recommendation");
        }
    }
}