using System.Collections.Generic;
using System.Threading.Tasks;
using Models.Application.Asset;
using Models.DB;

namespace Interfaces.Services
{

    public interface IAssetService
    {
        public AssetComposite GetAssets();
        public AssetLeaf GetAssetByName(string assetName);
        public Task Convert();
    }
}
