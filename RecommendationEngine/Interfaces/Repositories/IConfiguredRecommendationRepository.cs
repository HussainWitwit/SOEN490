using System;
using System.Collections.Generic;
using Models.DB;
using Models.Application;

namespace Interfaces.Repositories
{
    public interface IConfiguredRecommendationRepository
    {
        public List<ConfiguredRecommendation> Get();
    }
}