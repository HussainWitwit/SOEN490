using Models.Application;
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

        public ConfiguredRecommendation()
        {
        }

        public ConfiguredRecommendation(string title, string type, int frequencyOfRepetiton, string periodicity, int dayOfWeek, DateTime hourRepeated, DateTime createdOn, DateTime startDate, DateTime endDate, string createdBy, DateTime occurrenceDatetime, int span, DateTime centerPoint, string granularity, List<ConfiguredRecommendationParameter> parameters)
        {
            Title = title;
            Type = type;
            FrequencyOfRepetiton = frequencyOfRepetiton;
            Periodicity = periodicity;
            DayOfWeek = dayOfWeek;
            HourRepeated = hourRepeated;
            CreatedOn = createdOn;
            StartDate = startDate;
            EndDate = endDate;
            CreatedBy = createdBy;
            OccurrenceDatetime = occurrenceDatetime;
            Span = span;
            CenterPoint = centerPoint;
            Granularity = granularity;
            Parameters = parameters;
        }
    }
}