using System;
using System.Collections.Generic;

namespace RecommendationEngine.Models.Application.Recommendation
{
    public class RecommendationSchedule
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Granularity { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime OccurrenceDatetime { get; set; }
        public int Span { get; set; }
        public DateTime CenterPoint { get; set; }
        public List<RecommendationScheduleParameter> Parameters { get; set; }
    }
}