using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("RecommendationType")]
    public class DBRecommendationType
    {
        public int RecommendationTypeId { get; set; }
        public string Type { get; set; }
        public string DisplayText { get; set; }
        public virtual List<DBRecommendationSchedule> SchedulesOfTypeList { get; set; }
        public virtual List<DBRecommendationParameter> DefaultParametersList { get; set; }
    }
}
