using Models.DB;
using Quartz;

namespace RecommendationScheduler.RecommendationJob
{
    public class RecommendationJobFactory
    {
        public DBRecommendationSchedule Schedule { get; set; }

        public RecommendationJobFactory(DBRecommendationSchedule schedule)
        {
            Schedule = schedule;
        }

        public IJobDetail CreateRecommendationJob(DBAsset asset)
        {
            switch (Schedule.RecommendationType.Type)
            {
                case "Yearly Wash Optimization":
                    return JobBuilder.Create<YearlyWashOptimizationRecommendationJob>()
                        .WithIdentity(Schedule.RecommendationScheduleId.ToString() + "/" + asset.AssetId.ToString())
                        .UsingJobData("recommendationScheduleId", Schedule.RecommendationScheduleId)
                        .UsingJobData("assetId", asset.AssetId)
                        .WithDescription(Schedule.Description)
                        .Build();
                default:
                    throw new System.NotImplementedException();
            }
        }
    }
}