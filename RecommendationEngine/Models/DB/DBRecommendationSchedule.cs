using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("RecommendationSchedule")]
    public class DBRecommendationSchedule
    {
        [Key]
        public int RecommendationScheduleId { get; set; }
        public string ModifiedBy { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string Granularity { get; set; }
        public string Description { get; set; }
        public DateTime OccurenceDatetime { get; set; }
        public DateTime CreatedOn { get; set; }
        public virtual DBRecommendationType RecommendationType { get; set; }
        public virtual ICollection<DBAssetRecommendationSchedule> AssetsList { get; set; }
        public virtual ICollection<DBRecommendationJob> JobsList { get; set; }
        public virtual ICollection<DBRecommendationScheduleParameter> ParametersList { get; set; }
    }
}
