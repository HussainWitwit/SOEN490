﻿using System;
using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class DBRecommendationSchedule
    {
        public int RecommendationScheduleId { get; set; }
        public string ModifiedBy { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string Granularity { get; set; }
        public string Description { get; set; }
        public DateTime OccurenceDatetime { get; set; }
        public DateTime CreatedOn { get; set; }
        public DBRecommendationType RecommendationType { get; set; }
        public List<DBAsset> AssetsList { get; set; }
        public List<DBRecommendationJobResult> RunResults { get; set; }
        public List<DBRecommendationScheduleParameter> ParametersList { get; set; }
    }
}