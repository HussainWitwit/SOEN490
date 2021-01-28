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
                        configuredRecommendationTitle = job.Schedule.Name,
                        Duration = job.JobDuration,
                        Timestamp = job.Timestamp,
                    }).ToList();
                
                return jobs;
            }
            catch(Exception e)
            {
                throw new GlobalException(StatusCodes.Status500InternalServerError, "Internal Server Error", e.Message, "Recommendation Engine");
            }
        }
    }
}