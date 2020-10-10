using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecommendationEngine.Models
{
    public class RecommendationJobLog
    {
        private int recommendationJobLogId { get; set; }
        private string description { get; set; }
        private DateTime time { get; set; }
        private string level { get; set; }
    }
}
