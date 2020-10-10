using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class RecommendationParameter
    {
        public int RecommendationParameterId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public double DefaultValue { get; set; }
        public RecommendationType ForRecommendationType { get; set; }
        public List<RecommendationScheduleParameter> RecommendationScheduleParametersList { get; set; }
    }
}
