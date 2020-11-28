using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;
using Quartz;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace RecommendationScheduler.RecommendationJob
{
    public abstract class RecommendationJob : IJob
    {
        public int RecommendationScheduleId { get; set; }
        protected DBRecommendationJob _recommendationJob;
        protected Stopwatch watch = new Stopwatch();
        protected IRecommendationJobLogger _jobLogger;
        protected IRecommendationSchedulerRepository _schedulerRepository;

        public Task Execute(IJobExecutionContext context)
        {
            try
            {
                // Start execution
                JobDataMap dataMap = context?.JobDetail.JobDataMap;
                if (dataMap != null) RecommendationScheduleId = dataMap.GetIntValue("recommendationScheduleId");
                CreateRecommendationJob();
                watch.Start();
                _jobLogger.LogInformation(_recommendationJob, "Job started!");

                // Execute
                ExecuteJob();

                // Finish execution
                _jobLogger.LogInformation(_recommendationJob, "Job finished!");
                watch.Stop();
                _schedulerRepository.UpdateRecommendationJobStatus(_recommendationJob.RecommendationJobId, "Success",
                    watch.Elapsed.Seconds);
                return Task.CompletedTask;
            }
            catch (Exception e)
            {
                // Handle exception
                _schedulerRepository.UpdateRecommendationJobStatus(_recommendationJob.RecommendationJobId, "Failed",
                    watch.Elapsed.Seconds);
                return Task.CompletedTask;
            }
        }
        protected void CreateRecommendationJob()
        {
            DBRecommendationSchedule schedule = _schedulerRepository.GetDbRecommendationScheduleById(RecommendationScheduleId);
            DBRecommendationJob job = new DBRecommendationJob
            {
                Asset = schedule.AssetsList.FirstOrDefault()?.Asset,
                Status = "Running",
                TriggeredBy = "Scheduler",
                Timestamp = DateTime.Now,
                Schedule = schedule
            };
            _recommendationJob = _schedulerRepository.AddRecommendationJob(job);
        }

        // Contains custom behaviour
        protected abstract void ExecuteJob();
    }
}