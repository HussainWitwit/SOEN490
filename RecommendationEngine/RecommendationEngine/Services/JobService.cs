using Interfaces.Repositories;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Models.Application;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RecommendationEngine.Services
{
    public class JobService : IJobService
    {
        private IJobRepository _jobRepository;

        public JobService(
            IJobRepository jobRepository
        )
        {
            _jobRepository = jobRepository;
        }
        public List<Job> GetJobList()
        {
            try
            {
                List<DBRecommendationJob> dbJobs = _jobRepository.GetJobList();

                List<Job> jobs = new List<Job>();

                foreach (DBRecommendationJob dbJob in dbJobs)
                {
                    jobs.Add(
                        new Job
                        {
                            Id = dbJob.RecommendationJobId,
                            Status = dbJob.Status,
                            configuredRecommendationTitle = dbJob.Schedule.Name,
                            Duration = dbJob.JobDuration,
                            Timestamp = dbJob.Timestamp,
                        });
                }
                return jobs;
            }
            catch(Exception e)
            {
                Error error = new Error
                {
                    Type = ErrorType.INTERNAL_SERVER,
                    ErrorCode = 500,
                    ErrorMessage = e.Message
                };
                throw new GlobalException(error, "Recommendation Engine");
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
                    Error error = new Error
                    {
                        Type = ErrorType.BAD_REQUEST,
                        ErrorCode = 404,
                        ErrorMessage = "Could not find logs for job ID " + id
                    };
                    throw new GlobalException(error, "Recommendation Engine");
                }

                return logs;
            }
            catch (GlobalException e)
            {
                throw e;
            }
            catch (Exception e)
            {
                Error error = new Error
                {
                    Type = ErrorType.INTERNAL_SERVER,
                    ErrorCode = 500,
                    ErrorMessage = e.Message
                };
                throw new GlobalException(error, "Recommendation Engine");
            }
        }
    }
}