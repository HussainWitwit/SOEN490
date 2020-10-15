using RecommendationEngine.Models.Application.Recommendation;

namespace RecommendationEngine.Models.Application.RecommendationJob
{
    public class RecommendationJobFactory
    {

        public IRecommendationJob createRecommendationJob(RecommendationSchedule schedule)
        {
            switch (schedule.Type)
            {
                case "Yearly Wash Optimization": 
                    return new YearlyWashOptimizationRecommendationJob();
                case "Wind Turbine Change":
                    return new WindTurbineChangeRecommendationJob();
                default:
                    throw new System.NotImplementedException();
            }
        }
    }
}