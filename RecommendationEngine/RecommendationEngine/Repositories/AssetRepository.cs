using Interfaces.Repositories;
using Models.DB;
using System.Collections.Generic;
using System.Linq;

namespace RecommendationEngine.Repositories
{
    public class AssetRepository : IAssetRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public AssetRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public void AddAsset(DBAsset asset)
        {
            _recommendationEngineDb.Assets.Add(asset);
            _recommendationEngineDb.SaveChanges();
        }

        public void AddAssetList(List<DBAsset> asset)
        {
            _recommendationEngineDb.Assets.AddRange(asset);
            _recommendationEngineDb.SaveChanges();
        }

        public List<DBAsset> GetAssetsList()
        {
            return _recommendationEngineDb.Assets.ToList();
        }

        public DBAsset GetAssetByName(string assetName)
        {
            return _recommendationEngineDb.Assets.FirstOrDefault(a => a.Name == assetName);
        }
    }
}
