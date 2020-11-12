using System;
using System.Linq;
using Models.DB;
using Interfaces.Repositories;
using System.Collections.Generic;
using RecommendationEngine.Models.Application;
using Microsoft.EntityFrameworkCore;

namespace RecommendationEngine.Repositories
{
    public class ConfiguredRecommendationRepository : IConfiguredRecommendationRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ConfiguredRecommendationRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public DBRecommendationSchedule Add(DBRecommendationSchedule schedule)
        {
            _recommendationEngineDb.RecommendationSchedules.Add(schedule);
            _recommendationEngineDb.SaveChanges();
            return schedule;
        }

        public List<ConfiguredRecommendation> Get()
        {
            List<DBRecommendationSchedule> dbRecommendations = _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).ToList();
            List<ConfiguredRecommendation> recommendations = new List<ConfiguredRecommendation>();
            foreach (DBRecommendationSchedule dbRecommendation in dbRecommendations)
            {
                recommendations.Add(
                    new ConfiguredRecommendation
                    {
                        ConfiguredRecommendationId = dbRecommendation.RecommendationScheduleId,
                        Name = dbRecommendation.Name,
                        Type = dbRecommendation.RecommendationType.Type,
                        Granularity = dbRecommendation.Granularity,
                        CreatedBy = dbRecommendation.ModifiedBy,
                        RecurrenceDayOfWeek = dbRecommendation.RecurrenceDayOfWeek,
                        RecurrenceDatetime = dbRecommendation.RecurrenceDatetime,
                        CreatedOn = dbRecommendation.CreatedOn,
                        Parameters = null
                    }
                    ); ;
            }
            return recommendations;
        }

        public void Delete(int id)
        {
            DBRecommendationSchedule configToRemove = _recommendationEngineDb.RecommendationSchedules
                .Where(x => x.RecommendationScheduleId == id)
                .FirstOrDefault();

            List<DBRecommendationJob> jobsToRemove = _recommendationEngineDb.RecommendationJobs
                .Where(x => x.Schedule.RecommendationScheduleId == configToRemove.RecommendationScheduleId)
                .ToList();

            //List<DBRecommendationJobLog> jobLogsToRemove = _recommendationEngineDb.RecommendationJobLogs

            _recommendationEngineDb.RecommendationSchedules.Remove(configToRemove);
            _recommendationEngineDb.SaveChanges();
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            return _recommendationEngineDb.RecommendationTypes
                .Where(rec => rec.Type.Equals(recommendationType))
                .FirstOrDefault();
        }
    }
}
