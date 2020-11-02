using System;
using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Repositories
{
    public interface IConfiguredRecommendationRepository
    {
        public void Add(DBRecommendationSchedule configuredRecommendation);
        public List<DBRecommendationSchedule> Get();
        public DBRecommendationType GetRecommendationTypeByType(string recommendationType);
    }
}
