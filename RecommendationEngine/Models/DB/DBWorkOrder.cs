using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("WorkOrder")]
    public class DBWorkOrder
    {
        [Key]
        public int WorkOrderId { get; set; }
        public string DisplayText { get; set; }
        public double CostOfWork { get; set; }
        public DateTime Time { get; set; }
        public string Protocol { get; set; }
        public virtual ICollection<DBAction> Actions { get; set; }
    }
}
