using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecommendationEngine.Models
{
    public class RecommendationJobResult
    {
        private int recommendationJobResultId { get; set; }
        private string displayText { get; set; }
        private string status { get; set; }
        private string result { get; set; }
        private string triggeredBy { get; set; }
        private DateTime jobDuration { get; set; }
        private DateTime timestamp { get; set; }
    }
}
