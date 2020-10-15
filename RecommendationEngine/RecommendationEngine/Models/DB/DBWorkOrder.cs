﻿using System;

namespace RecommendationEngine.Models.DB
{
    public class DBWorkOrder
    {
        public int WorkOrderId { get; set; }
        public string DisplayText { get; set; }
        public double CostOfWork { get; set; }
        public DateTime Time { get; set; }
        public string Protocol { get; set; }
        public DBAction Action { get; set; }
    }
}