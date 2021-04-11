using Models.DB;
using System.Collections.Generic;

namespace Interfaces.Repositories
{

    public interface IAssetRepository
    {
        public void AddAsset(DBAsset asset);
        public void AddAssetList(List<DBAsset> assets);
        public void Update(DBAsset asset);
        public List<DBAsset> GetAssetsList();
        public DBAsset GetAssetByName(string assetName);
        public DBAsset GetAssetById(int assetId);
    }
}