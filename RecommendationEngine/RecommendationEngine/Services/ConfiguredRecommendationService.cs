using Interfaces.Repositories;
using Interfaces.Services;
using Models.Application;
using Models.DB;
using System.Collections.Generic;
using System.Linq;

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