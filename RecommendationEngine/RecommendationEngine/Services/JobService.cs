using Interfaces.Repositories;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Models.Application;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;

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
                throw new GlobalException(StatusCodes.Status500InternalServerError, "Internal Server Error", e.Message, "Recommendation Engine");
            }
        }
    }
}