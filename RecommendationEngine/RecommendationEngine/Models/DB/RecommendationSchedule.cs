using System;
using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class RecommendationSchedule
    {
        public int RecommendationScheduleId { get; set; }
        public string ModifiedBy { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string Granularity { get; set; }
        public string Description { get; set; }
        public DateTime OccurenceDatetime { get; set; }
        public DateTime CreatedOn { get; set; }
        public RecommendationType RecommendationType { get; set; }
        public List<Asset> AssetsList { get; set; }
        public List<RecommendationJobResult> RunResults { get; set; }
        public List<RecommendationScheduleParameter> ParametersList { get; set; }
    }
}
