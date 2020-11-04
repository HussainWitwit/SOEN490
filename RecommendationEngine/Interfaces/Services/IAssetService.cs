using System;
using System.Collections.Generic;
using Models.DB;

namespace Interfaces.Services {

        public interface IAssetService {
                public List<DBAsset> GetAssets();
                public DBAsset GetAssetById(int id);
        }
}
