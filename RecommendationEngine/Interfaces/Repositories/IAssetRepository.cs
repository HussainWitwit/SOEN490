using System;
using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Repositories
{

    public interface IAssetRepository
    {
        public void AddSingleDBAsset(DBAsset asset);
        public void AddDBAssetList(List<DBAsset> asset);
        public List<DBAsset> Get();
        public DBAsset GetAssetByName(string assetName);
    }
}
