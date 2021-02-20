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
                List<Job> jobs = _jobRepository.GetJobList()
                    .Select(job => new Job
                    {
                        Id = job.RecommendationJobId,
                        Status = job.Status,
                        ConfiguredRecommendationId = job.Schedule.RecommendationScheduleId,
                        ConfiguredRecommendationTitle = job.Schedule.Name,
                        Duration = job.JobDuration,
                        Timestamp = job.Timestamp,
                        AssetName = job.Asset.DisplayText
                    }).ToList();
                
                return jobs;
            }
            catch(Exception e)
            {
                throw new GlobalException(StatusCodes.Status500InternalServerError, "Internal Server Error", e.Message, "Recommendation Engine");
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
                    throw new GlobalException
                    {
                        ApplicationName = "RecommendationEngine",
                        ErrorMessage = "Could not find logs for selected job",
                        Code = 404,
                        Type = "Not Found"
                    };
                }

                return logs;
            }
            catch (GlobalException e)
            {
                throw e;
            }
            catch (Exception e)
            {
                throw new GlobalException(StatusCodes.Status500InternalServerError, "Internal Server Error", e.Message, "Recommendation Engine");
            }
        }
    }
}