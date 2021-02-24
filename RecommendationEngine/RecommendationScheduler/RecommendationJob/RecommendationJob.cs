using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;
using Quartz;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Hub;
using Interfaces.Services.ExternalApi;
using Models.Application;

namespace RecommendationScheduler.RecommendationJob
{
    public abstract class RecommendationJob : IJob
    {
        public int RecommendationScheduleId { get; set; }
        public int AssetId { get; set; }
        protected DBRecommendationJob _recommendationJob;
        protected Stopwatch watch = new Stopwatch();
        protected IRecommendationJobLogger _jobLogger;
        protected IRecommendationSchedulerRepository _schedulerRepository;
        protected IMetadataDriveService _metadataDriveService;
        protected INotificationHub _notificationHub;

        public Task Execute(IJobExecutionContext context)
        {
            try
            {
                // Start execution
                JobDataMap dataMap = context?.JobDetail.JobDataMap;
                if (dataMap != null)
                {
                    RecommendationScheduleId = dataMap.GetIntValue("recommendationScheduleId");
                    AssetId = dataMap.GetIntValue("assetId");
                }
                CreateRecommendationJob();
                watch.Start();
                _jobLogger.LogInformation(_recommendationJob, "Job started!", null);

                // Execute
                DBRecommendationJobResult jobResult = ExecuteJob();

                // Finish execution
                _jobLogger.LogInformation(_recommendationJob, "Job finished!", null);
                watch.Stop();
                _schedulerRepository.UpdateRecommendationJobStatus(_recommendationJob.RecommendationJobId, "Success",
                    watch.Elapsed.Seconds);
                _jobLogger.LogInformation(_recommendationJob, "This job has succeeded", null);

                if(jobResult.ActionsSuggestedList.Count>0)
                    _notificationHub.SendNotification(new NotificationMessage
                    {
                        Type = NotificationType.Information,
                        Message = "New available actions on " + _recommendationJob.Asset.DisplayText + " were found from " + _recommendationJob.Schedule.Name + "."
                    });
                return Task.CompletedTask;
            }
            catch (Exception e)
            {
                // Handle exception
                _schedulerRepository.UpdateRecommendationJobStatus(_recommendationJob.RecommendationJobId, "Failed",
                    watch.Elapsed.Seconds);
                _jobLogger.LogError(_recommendationJob, "This job has failed",  e.Message );
                _notificationHub.SendNotification(new NotificationMessage
                {
                    Type = NotificationType.Error,
                    Message = "A job from " + _recommendationJob.Schedule.Name + " has failed and requires your attention!"
                });
                return Task.CompletedTask;
            }
        }
        protected void CreateRecommendationJob()
        {
            DBRecommendationSchedule schedule = _schedulerRepository.GetDbRecommendationScheduleById(RecommendationScheduleId);
            DBRecommendationJob job = new DBRecommendationJob
            {
                Asset = schedule.AssetsList.FirstOrDefault(asset => asset.AssetId == AssetId)?.Asset,
                Status = "Running",
                TriggeredBy = "Scheduler",
                Timestamp = DateTime.Now,
                Schedule = schedule
            };
            _recommendationJob = _schedulerRepository.AddRecommendationJob(job);
        }

        protected abstract DBRecommendationJobResult ExecuteJob();

        protected abstract void GetFromAPI();

        protected abstract void GetFromDB();

        protected void SaveResult(DBRecommendationJob job, DBRecommendationJobResult result)
        {
            _schedulerRepository.AddResult(job, result);
        }

    }
}