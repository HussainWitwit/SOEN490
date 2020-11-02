using RecommendationEngine.Models.Application;
using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Services
{
    public interface IConfiguredRecommendationService
    {
        public List<DBRecommendationSchedule> getConfiguredRecommendationList();
        public void AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation);
    }
}