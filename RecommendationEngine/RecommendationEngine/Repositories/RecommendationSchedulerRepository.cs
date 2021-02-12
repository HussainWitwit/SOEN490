using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
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
            try
            {
                return _recommendationEngineDb.RecommendationJobs.FirstOrDefault(x => x.RecommendationJobId == id);
            }
            catch (Exception) {
                throw new DbException();
            }
        }

        public DBRecommendationSchedule GetDbRecommendationScheduleById(int id)
        {
            try
            {
                return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).Include(x => x.AssetsList)
                    .ThenInclude(x => x.Asset).Include(x => x.ParametersList).FirstOrDefault(x =>
                      x.RecommendationScheduleId == id);
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public List<DBRecommendationSchedule> GetDbRecommendationSchedules()
        {
            try
            {
                return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).Include(x => x.AssetsList)
                    .ThenInclude(x => x.Asset).ToList();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public DBRecommendationJob AddRecommendationJob(DBRecommendationJob job)
        {
            try
            {
                _recommendationEngineDb.RecommendationJobs.Add(job);
                _recommendationEngineDb.SaveChanges();
                return job;
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public void UpdateRecommendationJobStatus(int jobId, string status)
        {
            try
            {
                DBRecommendationJob dbRecommendationJob = _recommendationEngineDb.RecommendationJobs.FirstOrDefault(x =>
                    x.RecommendationJobId == jobId);
                if (dbRecommendationJob != null) dbRecommendationJob.Status = status;
                _recommendationEngineDb.SaveChanges();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public void UpdateRecommendationJobStatus(int jobId, string status, int jobDurationSeconds)
        {
            try
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
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public void AddResult(DBRecommendationJob _recommendationJob, DBRecommendationJobResult _result)
        {
            try
            {
                _recommendationJob.Result = _result;
                _recommendationEngineDb.SaveChanges();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }
    }
}
