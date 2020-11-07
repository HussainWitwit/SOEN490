﻿using Models.DB;
using Quartz;
using RecommendationScheduler.RecommendationTypes;

namespace RecommendationScheduler.RecommendationJob
{
    public class RecommendationJobFactory
    {
        public DBRecommendationSchedule Schedule { get; set; }

        public RecommendationJobFactory(DBRecommendationSchedule schedule)
        {
            Schedule = schedule;
        }

        public IJobDetail CreateRecommendationJob()
        {
            switch (Schedule.RecommendationType.Type)
            {
                case "Yearly Wash Optimization": 
                    return JobBuilder.Create<YearlyWashOptimizationRecommendationJob>()
                        .WithIdentity(Schedule.RecommendationScheduleId.ToString())
                        .UsingJobData("recommendationScheduleId", Schedule.RecommendationScheduleId)
                        .WithDescription(Schedule.Description)
                        .Build();
                case "Fuse Replacement":
                    return JobBuilder.Create<FuseReplacementRecommendationJob>()
                        .WithIdentity(Schedule.RecommendationScheduleId.ToString())
                        .UsingJobData("recommendationScheduleId", Schedule.RecommendationScheduleId)
                        .WithDescription(Schedule.Description)
                        .Build();
                default:
                    throw new System.NotImplementedException();
            }
        }
    }
}