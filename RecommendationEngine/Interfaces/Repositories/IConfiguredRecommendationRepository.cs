using System;
using System.Collections.Generic;
using Models.DB;
using RecommendationEngine.Models.Application;

namespace Interfaces.Repositories
{
    public interface IConfiguredRecommendationRepository
    {
        public DBRecommendationSchedule Add(DBRecommendationSchedule configuredRecommendation);
        public List<ConfiguredRecommendation> Get();
        public DBRecommendationType GetRecommendationTypeByType(string recommendationType);
        public DBRecommendationSchedule Edit(DBRecommendationSchedule configuredRecommendation, int id);
    }
}
