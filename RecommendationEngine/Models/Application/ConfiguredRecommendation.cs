﻿using Models.Application;
using System;
using System.Collections.Generic;

namespace RecommendationEngine.Models.Application
{
    public class ConfiguredRecommendation
    {
        public int ConfiguredRecommendationId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Granularity { get; set; }
        public string CreatedBy { get; set; }
        public int RecurrenceDayOfWeek { get; set; }
        public DateTime RecurrenceDatetime { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<ConfiguredRecommendationParameter> Parameters { get; set; }
    }
}