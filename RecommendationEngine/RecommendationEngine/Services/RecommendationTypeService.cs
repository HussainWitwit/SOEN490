using System;
using System.Collections.Generic;
using Interfaces.Services;
using Interfaces.Services.ExternalAPI;
using Models.Recommendation;
using Interfaces.Repositories;
using System.Linq;

namespace RecommendationEngine.Services
{
    public class RecommendationTypeService : IRecommendationTypeService
    {

        private IDriveService _driveService;
        private IRecommendationTypeRepository _recommendationTypeRepository;

        public RecommendationTypeService(IDriveService driveService, IRecommendationTypeRepository recommendationTypeRepository)
        {
            _driveService = driveService;
            _recommendationTypeRepository = recommendationTypeRepository;
        }

        public List<ConfiguredRecommendationType> GetRecommendationTypes() {
            List<ConfiguredRecommendationType> recommendationTypes = _recommendationTypeRepository.GetRecommendationTypes()
                .Select(recommendationType => new ConfiguredRecommendationType
                {
                    TemplateName = recommendationType.DisplayText,
                    TemplateDescription = recommendationType.Description,
                    AlgorithmName = recommendationType.Type,
                    InputList = recommendationType.DefaultParametersList.Select(param => new ConfiguredRecommendationParameter
                    {
                        ParameterName = param.DisplayText,
                        DefaultValue = param.DefaultValue
                    }).ToList()
                }).ToList();

            return recommendationTypes;
        }
    }
}
