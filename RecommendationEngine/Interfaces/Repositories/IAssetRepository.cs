using System;
using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Repositories {

        public interface IAssetRepository {
                public List<DBAsset> Get();
                public DBAsset GetAssetByName(string assetName);
        }
}
