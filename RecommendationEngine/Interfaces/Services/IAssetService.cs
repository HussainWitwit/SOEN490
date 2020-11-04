using Models.Application.Asset;

namespace Interfaces.Services {

        public interface IAssetService {
                public AssetComposite GetAssets();
                public AssetLeaf GetAssetByName(string assetName);
        }
}
