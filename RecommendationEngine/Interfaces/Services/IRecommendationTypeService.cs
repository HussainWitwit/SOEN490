using System;
using System.Collections.Generic;
using Models.Recommendation;

namespace Interfaces.Services
{
    public interface IRecommendationTypeService
    {
        public List<ConfiguredRecommendationType> GetRecommendationTypes();
    }
}
