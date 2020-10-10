using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecommendationEngine.Models
{
    public class RecommendationScheduleParameter
    {
        private int recommendationScheduleParameterId { get; set; }
        private string displayText { get; set; }
        private string modifiedBy { get; set; }
        private DateTime startDate { get; set; }
        private DateTime endDate { get; set; }
        private string paramValue { get; set; } //Subject to change type
    }
}
