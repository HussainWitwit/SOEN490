using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class DBRecommendationParameter
    {
        public int RecommendationParameterId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public double DefaultValue { get; set; }
        public DBRecommendationType ForRecommendationType { get; set; }
        public List<DBRecommendationScheduleParameter> RecommendationScheduleParametersList { get; set; }
    }
}
