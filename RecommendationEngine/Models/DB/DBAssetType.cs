using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("AssetType")]
    public class DBAssetType
    {
        [Key]
        public int AssetTypeId { get; set; }
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string EnergyType { get; set; }
        public virtual ICollection<DBAsset> AssetsList { get; set; }
    }
}
