using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("WorkOrder")]
    public class DBWorkOrder
    {
        public int WorkOrderId { get; set; }
        public string DisplayText { get; set; }
        public double CostOfWork { get; set; }
        public DateTime Time { get; set; }
        public string Protocol { get; set; }
        public List<DBAction> Actions { get; set; }
    }
}
