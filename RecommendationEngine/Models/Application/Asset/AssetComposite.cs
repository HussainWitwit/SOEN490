using System.Collections.Generic;

namespace Models.Application.Asset
{
    public class AssetComposite : Asset
    {
        public List<AssetComposite> Children { get; set; }
    }
}