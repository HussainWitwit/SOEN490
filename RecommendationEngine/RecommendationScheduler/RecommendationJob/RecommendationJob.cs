﻿using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;
using Quartz;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;

namespace RecommendationScheduler.RecommendationJob
{
    public abstract class RecommendationJob : IJob
    {
        public int RecommendationScheduleId { get; set; }
        protected DBRecommendationJob _recommendationJob;
        protected Stopwatch watch = new Stopwatch();
        protected IRecommendationJobLogger _jobLogger;
        protected IRecommendationSchedulerRepository _schedulerRepository;
        protected IMetadataDriveService _metadataDriveService;

        public Task Execute(IJobExecutionContext context)
        {
            try
            {
                // Start execution
                JobDataMap dataMap = context?.JobDetail.JobDataMap;
                if (dataMap != null) RecommendationScheduleId = dataMap.GetIntValue("recommendationScheduleId");
                CreateRecommendationJob();
                watch.Start();
                _jobLogger.LogInformation(_recommendationJob, "Job started!", null);

                // Execute
                ExecuteJob();

                // Finish execution
                _jobLogger.LogInformation(_recommendationJob, "Job finished!", null);
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
                _jobLogger.LogFatal(_recommendationJob, "This job has failed",  e );
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

        protected abstract void ExecuteJob();

        protected abstract void GetFromAPI();

        protected abstract void GetFromDB();

        protected void SaveResult(DBRecommendationJob job, DBRecommendationJobResult result)
        {
            _schedulerRepository.AddResult(job, result);
        }

    }
}