using System;
using System.Linq;
using System.Collections.Generic;
using RecommendationEngine.Models.Application;
using Interfaces.Services;
using Models.DB;
using Interfaces.Services.ExternalApi;
using RecommendationEngine.configuredRecommendationHelper;
using Interfaces.Repositories;

namespace RecommendationEngine.ConfiguredRecommendationServices
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IDriveService _driveService;
        private IConfiguredRecommendationRepository _repository;

        public ConfiguredRecommendationService(
                IDriveService driveService,
                IConfiguredRecommendationRepository repsitory
        )
        {
            _driveService = driveService;
            _repository = repsitory;
        }

        public List<ConfiguredRecommendation> getConfiguredRecommendationList()
        {
            return _repository.Get();
        }

        public void AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            var recommendationType = _repository.GetRecommendationTypeByType(configuredRecommendation.Type);
            configuredRecommendation.Validate(recommendationType);

            DBRecommendationSchedule config = new DBRecommendationSchedule
            {
                Name = configuredRecommendation.Name,
                DisplayText = recommendationType.DisplayText,
                Granularity = configuredRecommendation.Granularity,
                Description = recommendationType.Description,
                CreatedOn = configuredRecommendation.CreatedOn,
                RecurrenceDatetime = configuredRecommendation.RecurrenceDatetime,
                RecurrenceDayOfWeek = configuredRecommendation.RecurrenceDayOfWeek,
                RecommendationType = recommendationType
            };
            _repository.Add(config);
        }
    }
}