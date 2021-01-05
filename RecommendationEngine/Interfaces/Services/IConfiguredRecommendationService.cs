using Models.Application;
using System.Collections.Generic;

namespace Interfaces.Services
{
    public interface IConfiguredRecommendationService
    {
        public List<ConfiguredRecommendation> GetConfiguredRecommendationList();
        public void AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation);
        public ConfiguredRecommendation GetConfiguredRecommendationById(int id);
        public ConfiguredRecommendation EditConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation, int id);
        public void DeleteConfiguredRecommendation(int id);
    }
}
