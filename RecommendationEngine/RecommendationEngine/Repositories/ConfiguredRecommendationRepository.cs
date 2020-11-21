using System;
using System.Linq;
using Models.DB;
using Interfaces.Repositories;
using System.Collections.Generic;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Models.Application;
using Microsoft.EntityFrameworkCore;

namespace RecommendationEngine.Repositories
{
    public class ConfiguredRecommendationRepository : IConfiguredRecommendationRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ConfiguredRecommendationRepository(RecommendationEngineDBContext recommendationEngineDb) {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public DBRecommendationSchedule Add(DBRecommendationSchedule schedule) {
            _recommendationEngineDb.RecommendationSchedules.Add(schedule);
            _recommendationEngineDb.SaveChanges();
            return schedule;
        }

        public DBRecommendationSchedule Edit(DBRecommendationSchedule schedule, int id) {
            if (!_recommendationEngineDb.RecommendationSchedules.Any(x => x.RecommendationScheduleId == id)) {
                throw new GlobalException(400, "Bad Request", "Recommendation ID " + schedule.RecommendationScheduleId + " does not exist.", "Recommendation Engine");
            }
            DBRecommendationSchedule recToEdit = _recommendationEngineDb.RecommendationSchedules.Where(x => x.RecommendationScheduleId == id).FirstOrDefault();
            _recommendationEngineDb.Entry(recToEdit).CurrentValues.SetValues(schedule);
            _recommendationEngineDb.SaveChanges();
            return schedule;
        }

        public List<ConfiguredRecommendation> Get() {
            List<DBRecommendationSchedule> dbRecommendations = _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).ToList();
            List<ConfiguredRecommendation> recommendations = new List<ConfiguredRecommendation>();
            foreach (DBRecommendationSchedule dbRecommendation in dbRecommendations)
            {
                recommendations.Add(
                    new ConfiguredRecommendation
                    {
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

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType) {
            return _recommendationEngineDb.RecommendationTypes
                .Where(rec => rec.Type.Equals(recommendationType))
                .FirstOrDefault();
        }
    }
}
