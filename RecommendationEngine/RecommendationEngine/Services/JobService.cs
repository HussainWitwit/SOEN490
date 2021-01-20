using Interfaces.Repositories;
using Interfaces.Services;
using Models.Application;
using Models.DB;
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
            List<DBRecommendationJob> dbJobs = _jobRepository.GetJobList();

            List<Job> jobs = new List<Job>();

            foreach (DBRecommendationJob dbJob in dbJobs)
            {
                jobs.Add(
                    new Job
                    {
                        Id = dbJob.RecommendationJobId,
                        Status = dbJob.Status,
                        configuredRecommendationId = dbJob.Schedule.RecommendationScheduleId,
                        Duration = dbJob.JobDuration,
                        Timestamp = dbJob.Timestamp,
                    });
            }
            return jobs;
        }
    }
}