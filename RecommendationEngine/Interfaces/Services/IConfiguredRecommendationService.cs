using RecommendationEngine.Models.Application;
using System.Collections.Generic;

namespace Interfaces.Services
{
    public interface IConfiguredRecommendationService
    {
        public List<ConfiguredRecommendation> getConfiguredRecommendationList();
        public void AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation);
        public void EditConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation, int id);
    }
}