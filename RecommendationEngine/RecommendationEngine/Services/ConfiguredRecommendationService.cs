using System;
using System.Linq;
using System.Collections.Generic;
using Interfaces.RecommendationScheduler;
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
        private IRecommendationScheduler _scheduler;

        public ConfiguredRecommendationService(
                IDriveService driveService,
                IConfiguredRecommendationRepository repsitory,
                IRecommendationScheduler scheduler
        )
        {
            _driveService = driveService;
            _repository = repsitory;
            _scheduler = scheduler;
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
            var schedule = _repository.Add(config);
            _scheduler.ScheduleJobAsync(schedule);
        }
    }
}