using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;
using Quartz;

namespace RecommendationScheduler.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJob: RecommendationJob
    {
        private IRecommendationJobLogger _jobLogger;
        private IRecommendationSchedulerRepository _schedulerRepository;
        private DBRecommendationJob _recommendationJob;
        private Stopwatch watch = new Stopwatch();

        public YearlyWashOptimizationRecommendationJob(IRecommendationJobLogger jobLogger, IRecommendationSchedulerRepository schedulerRepository)
        {
            _jobLogger = jobLogger;
            _schedulerRepository = schedulerRepository;
        }

        public override Task Execute(IJobExecutionContext context)
        {
            try
            {
                JobDataMap dataMap = context?.JobDetail.JobDataMap;
                if (dataMap != null) RecommendationScheduleId = dataMap.GetIntValue("recommendationScheduleId");
                CreateRecommendationJob();
                watch.Start();

                _jobLogger.LogInformation(_recommendationJob, "Job started!");
                System.Threading.Thread.Sleep(5000);
                _jobLogger.LogInformation(_recommendationJob, "Job finished!");

                watch.Stop();
                _schedulerRepository.UpdateRecommendationJobStatus(_recommendationJob.RecommendationJobId, "Success",
                    watch.Elapsed.Seconds);
                return Task.CompletedTask;
            }
            catch (FileNotFoundException e)
            {
                _schedulerRepository.UpdateRecommendationJobStatus(_recommendationJob.RecommendationJobId, "Failed",
                    watch.Elapsed.Seconds);
                return Task.CompletedTask;
            }
        }

        protected sealed override void CreateRecommendationJob()
        {
            DBRecommendationSchedule schedule = _schedulerRepository.GetDbRecommendationScheduleById(RecommendationScheduleId);
            DBRecommendationJob job = new DBRecommendationJob
            {
                Asset = schedule.AssetsList.FirstOrDefault()?.Asset,
                Status = "Running",
                Timestamp = DateTime.Now,
                Schedule = schedule
            };
            _recommendationJob = _schedulerRepository.AddRecommendationJob(job);
        }
    }
}