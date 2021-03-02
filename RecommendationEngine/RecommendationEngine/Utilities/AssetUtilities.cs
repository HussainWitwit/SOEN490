using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using Models.DB;

namespace RecommendationEngine.Utilities
{
    public static class AssetUtilities
    {
        public static bool IsChildOrEquivalent(this DBAsset asset, int id, List<DBAsset> assetsList)
        {
            var currentAsset = asset;
            while (currentAsset != null)
            {
                if (currentAsset.AssetId == id)
                    return true;
                currentAsset = assetsList.FirstOrDefault(x=>x.AssetId==currentAsset.ParentAsset.AssetId);
            }
            return false;
        }
    }
}