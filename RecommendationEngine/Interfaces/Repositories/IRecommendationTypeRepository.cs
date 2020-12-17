using System;
using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Repositories
{
    public interface IRecommendationTypeRepository
    {
        public List<DBRecommendationType> GetRecommendationTypes();
    }
}
