using Models.Application;
using System.Collections.Generic;

namespace Interfaces.Services
{
    public interface IConfiguredRecommendationService
    {
        public List<ConfiguredRecommendation> getConfiguredRecommendationList();
    }
}
