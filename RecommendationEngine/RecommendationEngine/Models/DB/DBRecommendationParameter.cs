using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("RecommendationParameter")]
    public class DBRecommendationParameter
    {
        [Key]
        public int RecommendationParameterId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public double DefaultValue { get; set; }
        public virtual DBRecommendationType ForRecommendationType { get; set; }
        public virtual ICollection<DBRecommendationScheduleParameter> RecommendationScheduleParametersList { get; set; }
    }
}
