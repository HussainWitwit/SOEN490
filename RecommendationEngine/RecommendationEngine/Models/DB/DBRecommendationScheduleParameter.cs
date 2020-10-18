using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("RecommendationScheduleParameter")]
    public class DBRecommendationScheduleParameter
    {
        public int RecommendationScheduleParameterId { get; set; }
        public string DisplayText { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double ParamValue { get; set; }
        public virtual DBRecommendationParameter RecommendationParameter { get; set; }
        public virtual DBRecommendationSchedule Schedule { get; set; }
    }
}
