using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("RecommendationType")]
    public class DBRecommendationType
    {
        [Key]
        public int RecommendationTypeId { get; set; }
        public string Type { get; set; }
        public string DisplayText { get; set; }
        public string Description { get; set; }
        public string EnergyType { get; set; }
        public virtual ICollection<DBAssetTypeRecommendationType> AssetTypes { get; set; }
        public virtual ICollection<DBRecommendationSchedule> SchedulesOfTypeList { get; set; }
        public virtual ICollection<DBRecommendationParameter> DefaultParametersList { get; set; }
    }
}
