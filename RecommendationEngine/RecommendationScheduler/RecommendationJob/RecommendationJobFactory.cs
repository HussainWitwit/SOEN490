using Models.DB;

namespace RecommendationScheduler.RecommendationJob
{
    public class RecommendationJobFactory
    {

        public RecommendationJob CreateRecommendationJob(DBRecommendationSchedule schedule)
        {
            switch (schedule.RecommendationType.Type)
            {
                case "Yearly Wash Optimization": 
                    return new YearlyWashOptimizationRecommendationJob(schedule);
                case "Fuse Replacement":
                    return new FuseReplacementRecommendationJob(schedule);
                default:
                    throw new System.NotImplementedException();
            }
        }
    }
}