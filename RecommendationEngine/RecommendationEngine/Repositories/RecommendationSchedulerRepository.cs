﻿using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Models.DB;
using System.Collections.Generic;
using System.Linq;

namespace RecommendationEngine.Repositories
{
    public class RecommendationSchedulerRepository : IRecommendationSchedulerRepository
    {
        private readonly RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationSchedulerRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public DBRecommendationJob GetDbRecommendationJobById(int id)
        {
            return _recommendationEngineDb.RecommendationJobs.FirstOrDefault(x => x.RecommendationJobId == id);
        }

        public DBRecommendationSchedule GetDbRecommendationScheduleById(int id)
        {
            return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).Include(x => x.AssetsList)
                .ThenInclude(x => x.Asset).Include(x => x.ParametersList).FirstOrDefault(x =>
                  x.RecommendationScheduleId == id);
        }

        public List<DBRecommendationSchedule> GetDbRecommendationSchedules()
        {
            return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).Include(x => x.AssetsList)
                .ThenInclude(x => x.Asset).ToList();
        }

        public DBRecommendationJob AddRecommendationJob(DBRecommendationJob job)
        {
            _recommendationEngineDb.RecommendationJobs.Add(job);
            _recommendationEngineDb.SaveChanges();
            return job;
        }

        public void UpdateRecommendationJobStatus(int jobId, string status)
        {
            DBRecommendationJob dbRecommendationJob = _recommendationEngineDb.RecommendationJobs.FirstOrDefault(x =>
                x.RecommendationJobId == jobId);
            if (dbRecommendationJob != null) dbRecommendationJob.Status = status;
            _recommendationEngineDb.SaveChanges();
        }

        public void UpdateRecommendationJobStatus(int jobId, string status, int jobDurationSeconds)
        {
            DBRecommendationJob dbRecommendationJob = _recommendationEngineDb.RecommendationJobs.FirstOrDefault(x =>
                x.RecommendationJobId == jobId);
            if (dbRecommendationJob != null)
            {
                dbRecommendationJob.Status = status;
                dbRecommendationJob.JobDuration = jobDurationSeconds;
            }
            _recommendationEngineDb.SaveChanges();
        }

        public void AddResult(DBRecommendationJob _recommendationJob, DBRecommendationJobResult _result)
        {
            _recommendationJob.Result = _result;
            _recommendationEngineDb.SaveChanges();
        }
    }
}
