using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecommendationEngine.Models
{
    public class WorkOrder
    {
        private int workOrderId { get; set; }
        private string displayText { get; set; }
        private double costOfWork { get; set; }
        private DateTime time { get; set; }
        private string protocol { get; set; }
    }
}
