using System.Collections.Generic;
using Interfaces.Services;
using Models.Recommendation;
using Interfaces.Repositories;
using System.Linq;

namespace RecommendationEngine.Services
{
    public class RecommendationTypeService : IRecommendationTypeService
    {

        private IRecommendationTypeRepository _recommendationTypeRepository;

        public RecommendationTypeService(IRecommendationTypeRepository recommendationTypeRepository)
        {
            _recommendationTypeRepository = recommendationTypeRepository;
        }

        public List<ConfiguredRecommendationType> GetRecommendationTypes() {
            List<ConfiguredRecommendationType> recommendationTypes = _recommendationTypeRepository.GetRecommendationTypes()
                .Select(recommendationType => new ConfiguredRecommendationType
                {
                    TemplateName = recommendationType.DisplayText,
                    TemplateDescription = recommendationType.Description,
                    AlgorithmName = recommendationType.Type,
                    AssetTypes = recommendationType.AssetTypes.Select(assetType => assetType.AssetType.Name).ToList(),
                    InputList = recommendationType.DefaultParametersList.Select(param => new ConfiguredRecommendationParameter
                    {
                        ParameterName = param.Name,
                        DisplayText = param.DisplayText,
                        DefaultValue = param.DefaultValue,
                        ParameterType = param.Type,
                        ParameterValue = null
                    }).ToList()
                }).ToList();

            return recommendationTypes;
        }
    }
}
