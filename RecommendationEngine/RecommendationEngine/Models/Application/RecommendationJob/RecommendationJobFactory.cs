using RecommendationEngine.Models.Application;

namespace RecommendationEngine.Models.Application.RecommendationJob
{
    public class RecommendationJobFactory
    {

        public IRecommendationJob CreateRecommendationJob(RecommendationSchedule schedule)
        {
            switch (schedule.Type)
            {
                case "Yearly Wash Optimization": 
                    return new YearlyWashOptimizationRecommendationJob();
                case "Fuse Replacement":
                    return new FuseReplacementRecommendationJob();
                default:
                    throw new System.NotImplementedException();
            }
        }
    }
}