using System.Collections.Generic;
using Models.Application;
using Interfaces.Services;
using Interfaces.Repositories;

namespace RecommendationEngine.ConfiguredRecommendationServices
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IConfiguredRecommendationRepository _repository;

        public ConfiguredRecommendationService(
            IConfiguredRecommendationRepository repository
        )
        {
            _repository = repository;
        }

        public List<ConfiguredRecommendation> getConfiguredRecommendationList()
        {
            return _repository.Get();
        }
   
    }
}