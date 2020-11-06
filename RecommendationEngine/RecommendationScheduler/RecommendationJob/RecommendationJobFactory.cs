using System;
using System.ComponentModel;
using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;
using Quartz;
using Quartz.Spi;

namespace RecommendationScheduler.RecommendationJob
{
    public class RecommendationJobFactory: IJobFactory
    {
        public DBRecommendationSchedule _schedule { get; set; }

        public RecommendationJobFactory(DBRecommendationSchedule schedule)
        {
            _schedule = schedule;
        }

        public RecommendationJob CreateRecommendationJob()
        {
            switch (_schedule.RecommendationType.Type)
            {
                case "Yearly Wash Optimization": 
                    return new YearlyWashOptimizationRecommendationJob();
                case "Fuse Replacement":
                    return new FuseReplacementRecommendationJob();
                default:
                    throw new System.NotImplementedException();
            }
        }

        public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
        {
            return CreateRecommendationJob();
        }

        public void ReturnJob(IJob job)
        {
            var disposable = job as IDisposable;
            disposable?.Dispose();
        }
    }
}