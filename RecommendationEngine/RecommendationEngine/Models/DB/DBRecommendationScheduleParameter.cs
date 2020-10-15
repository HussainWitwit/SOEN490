using System;

namespace RecommendationEngine.Models.DB
{
    public class DBRecommendationScheduleParameter
    {
        public int RecommendationScheduleParameterId { get; set; }
        public string DisplayText { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double ParamValue { get; set; }
        public DBRecommendationParameter RecommendationParameter { get; set; }
        public DBRecommendationSchedule Schedule { get; set; }
    }
}
