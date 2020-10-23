using System;
using System.Collections.Generic;

namespace RecommendationEngine.Models.Application
{
    public class ConfiguredRecommendation
    {
        public string Title { get; set; }
        public string Type { get; set; }
        public int FrequencyOfRepetiton { get; set; }
        public string Periodicity { get; set; }
        public int DayOfWeek { get; set; }
        public DateTime HourRepeated { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime OccurrenceDatetime { get; set; }
        public int Span { get; set; }
        public DateTime CenterPoint { get; set; }
        public string Granularity { get; set; }
        public List<ConfiguredRecommendationParameter> Parameters { get; set; }
    }
}