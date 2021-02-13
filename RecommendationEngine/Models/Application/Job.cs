using System;

namespace Models.Application
{
    public class Job
    {
        public int Id { get; set; }
        public int Duration { get; set; }
        public int ConfiguredRecommendationId { get; set; }
        public string ConfiguredRecommendationTitle { get; set; } 
        public string Status { get; set; }
        public DateTime Timestamp { get; set; }
    }
}