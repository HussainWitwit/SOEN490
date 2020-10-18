using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("RecommendationParameter")]
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
