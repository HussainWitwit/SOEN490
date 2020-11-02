using System;
using System.Linq;
using System.Collections.Generic;
using RecommendationEngine.Models.Application;
using Interfaces.Services;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngine.configuredRecommendationHelper;
using Interfaces.Repositories;

namespace RecommendationEngine.ConfiguredRecommendationServices
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IDriveService _driveService;
        private RecommendationEngineDBContext _recommendationEngineRepository;
        private IRecommendationSchedulerRepository _recommendationSchedulerRepository;

        public ConfiguredRecommendationService(
                IDriveService driveService,
                RecommendationEngineDBContext recommendationEngineRepository,
                IRecommendationSchedulerRepository recommendationSchedulerRepository
        ){
            _driveService = driveService;
            _recommendationEngineRepository = recommendationEngineRepository;
            _recommendationSchedulerRepository = recommendationSchedulerRepository;
        }

        public List<DBRecommendationSchedule> getConfiguredRecommendationList()
        {
            List<DBRecommendationSchedule> list = _recommendationEngineRepository.RecommendationSchedules.ToList();
            return list;
        }

        public void addConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            configuredRecommendation.Validate();
            _recommendationSchedulerRepository.AddRecommendationToDB(configuredRecommendation);
        }
    }
}