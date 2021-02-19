using Interfaces.Repositories;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Linq;

namespace RecommendationEngine.Repositories
{
    public class AssetTypeRepository : IAssetTypeRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public AssetTypeRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public DBAssetType GetAssetTypeByName(string assetTypeName)
        {
            try
            {
                return _recommendationEngineDb.AssetTypes.FirstOrDefault(a => a.Name == assetTypeName);
            }
            catch (Exception) {
                throw new DbException();
            }
        }
    }
}