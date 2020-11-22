using System;
using System.Linq;
using Models.DB;
using Interfaces.Repositories;
using System.Collections.Generic;
using Models.Application;
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
            return dbRecommendations.Select((element) => new ConfiguredRecommendation {
                Name = element.Name,
                Type = element.RecommendationType.Type,
                Granularity = element.Granularity,
                CreatedBy = element.ModifiedBy,
                RecurrenceDayOfWeek = element.RecurrenceDayOfWeek,
                RecurrenceDatetime = element.RecurrenceDatetime,
                CreatedOn = element.CreatedOn,
                Parameters = null
            }).ToList(); 
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            return _recommendationEngineDb.RecommendationTypes
                .Where(rec => rec.Type.Equals(recommendationType))
                .FirstOrDefault();
        }
    }
}