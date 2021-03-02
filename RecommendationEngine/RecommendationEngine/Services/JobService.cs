using Interfaces.Repositories;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Models.Application;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Hub;
using RecommendationEngine.Utilities;

namespace RecommendationEngine.Services
{
    public class JobService : IJobService
    {
        private IJobRepository _jobRepository;
        private IAssetRepository _assetRepository;

        public JobService(
            IJobRepository jobRepository, INotificationHub notificationHub, IAssetRepository assetRepository
        )
        {
            _jobRepository = jobRepository;
            _assetRepository = assetRepository;
        }

        public List<Job> GetJobList(int? assetId)
        {
            try
            {
                var jobs = _jobRepository.GetJobList();
                var assetsList = _assetRepository.GetAssetsList();

                if (assetId != null)
                {
                    jobs = jobs
                        .Where(result => result.Asset.IsChildOrEquivalent((int)assetId, assetsList)).ToList();
                }

                return jobs.Select(job => new Job
                {
                    Id = job.RecommendationJobId,
                    Status = job.Status,
                    ConfiguredRecommendationId = job.Schedule.RecommendationScheduleId,
                    ConfiguredRecommendationTitle = job.Schedule.Name,
                    Duration = job.JobDuration,
                    Timestamp = job.Timestamp,
                    AssetName = job.Asset.DisplayText
                }).ToList();
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        public List<JobLog> GetJobLogsById(int id)
        {
            try
            {
                List<JobLog> logs = _jobRepository.GetJobLogById(id)
                    .Select(log => new JobLog
                    {
                        Id = log.RecommendationJobLogId,
                        Description = log.Description,
                        Level = log.Level,
                        Time = log.Time,
                    }).ToList();


                if (logs.Count < 1)
                {
                    Error error = new Error()
                    {
                        Type = ErrorType.BAD_REQUEST,
                        ErrorMessage = "Could not find logs for selected job"
                    };
                    throw new RequestValidationException(error, "Recommendation Engine");
                }
                return logs;
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }
    }
}