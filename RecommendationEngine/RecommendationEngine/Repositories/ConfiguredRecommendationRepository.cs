﻿using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Models.DB;
using System.Collections.Generic;
using System.Linq;

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
            if (!_recommendationEngineDb.Assets.Any())
            {
                throw new GlobalException(400, "Bad Request", "There are no assets associated to this recommendation.", "RecommendationEngine");
            }
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

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            return _recommendationEngineDb.RecommendationTypes
                .Where(rec => rec.Type.Equals(recommendationType))
                .FirstOrDefault();
        }
    }
}
