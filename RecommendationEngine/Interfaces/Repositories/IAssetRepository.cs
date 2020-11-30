using Models.DB;
using System.Collections.Generic;

namespace Interfaces.Repositories
{

    public interface IAssetRepository
    {
        public void AddAsset(DBAsset asset);
        public void AddAssetList(List<DBAsset> asset);
        public List<DBAsset> GetAssetsList();
        public DBAsset GetAssetByName(string assetName);
    }
}