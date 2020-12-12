using System;

namespace Models.Application
{
    public class RecommendationJob
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime Timestamp { get; set; }
    }
}