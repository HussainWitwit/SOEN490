using Interfaces.Repositories;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Models.Application;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Hub;

namespace RecommendationEngine.Services
{
    public class JobService : IJobService
    {
        private IJobRepository _jobRepository;
        private INotificationHub _notificationHub;

        public JobService(
            IJobRepository jobRepository, INotificationHub notificationHub
        )
        {
            _jobRepository = jobRepository;
            _notificationHub = notificationHub;
        }

        public List<Job> GetJobList()
        {
            try
            {
                List<Job> jobs = _jobRepository.GetJobList()
                    .Select(job => new Job
                    {
                        Id = job.RecommendationJobId,
                        Status = job.Status,
                        configuredRecommendationTitle = job.Schedule.Name,
                        Duration = job.JobDuration,
                        Timestamp = job.Timestamp,
                    }).ToList();

                return jobs;
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
                _notificationHub.SendNotification("Job logs have been loaded!");
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