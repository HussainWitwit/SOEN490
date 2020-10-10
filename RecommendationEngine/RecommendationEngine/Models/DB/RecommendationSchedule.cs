using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecommendationEngine.Models
{
    public class RecommendationSchedule
    {
        private int recommendationScheduleId { get; set; }
        private string modifiedBy { get; set; }
        private string name { get; set; }
        private string granularity { get; set; } //Subject to change type
        private string description { get; set; }
        private DateTime occurenceDatetime { get; set; }
        private DateTime createdOn { get; set; }
    }
}
