using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("RecommendationScheduleParameter")]
    public class DBRecommendationScheduleParameter
    {
        [Key]
        public int RecommendationScheduleParameterId { get; set; }
        public string Name { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ParamValue { get; set; }
        public virtual DBRecommendationParameter RecommendationParameter { get; set; }
        public virtual DBRecommendationSchedule Schedule { get; set; }
    }
}
