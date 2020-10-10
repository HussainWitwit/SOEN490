using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class RecommendationType
    {
        public int RecommendationTypeId { get; set; }
        public string Type { get; set; }
        public string DisplayText { get; set; }
        public List<RecommendationSchedule> SchedulesOfTypeList { get; set; }
        public List<RecommendationParameter> DefaultParametersList { get; set; }
    }
}
