using System;
using Models.DB;

namespace Interfaces.Services {

        public interface IAssetTypeService {
                public DBAssetType GetAssetTypeByName(string assetTypeName);
        }
}
