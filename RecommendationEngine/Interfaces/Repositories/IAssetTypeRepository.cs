using System;
using Models.DB;

namespace Interfaces.Repositories
{

    public interface IAssetTypeRepository
    {
        public DBAssetType GetAssetTypeByName(string assetTypeName);
    }
}
