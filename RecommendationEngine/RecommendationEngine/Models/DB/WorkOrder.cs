using System;

namespace RecommendationEngine.Models.DB
{
    public class WorkOrder
    {
        public int WorkOrderId { get; set; }
        public string DisplayText { get; set; }
        public double CostOfWork { get; set; }
        public DateTime Time { get; set; }
        public string Protocol { get; set; }
        public Action Action { get; set; }
    }
}
