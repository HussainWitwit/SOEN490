using System;
using System.Collections.Generic;
using Interfaces.Services;
using Models.Recommendation;
using Interfaces.Repositories;
using System.Linq;
using Models.DB;
using RecommendationEngine.ExceptionHandler;

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
            try
            {
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
            catch (GlobalException) {
                throw;
            }
            catch (Exception) {
                throw new InternalServerException();
            }
        }
    }
}
