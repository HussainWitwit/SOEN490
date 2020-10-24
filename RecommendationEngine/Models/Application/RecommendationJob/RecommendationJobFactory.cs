namespace Models.Application.RecommendationJob
{
    public class RecommendationJobFactory
    {

        public IRecommendationJob CreateRecommendationJob(ConfiguredRecommendation schedule)
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