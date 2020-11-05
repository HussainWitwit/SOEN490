using System.Linq;
using Models.DB;
using Interfaces.Repositories;
using System.Collections.Generic;

namespace RecommendationEngine.Repositories
{
    public class AssetRepository : IAssetRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public AssetRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public void AddSingleDBAsset(DBAsset asset)
        {
            _recommendationEngineDb.Assets.Add(asset);
            _recommendationEngineDb.SaveChanges();
        }

        public void AddDBAssetList(List<DBAsset> asset)
        {
            _recommendationEngineDb.Assets.AddRange(asset);
            _recommendationEngineDb.SaveChanges();
        }

        public List<DBAsset> Get()
        {
            return _recommendationEngineDb.Assets.ToList();
        }

        public DBAsset GetAssetByName(string assetName)
        {
            return _recommendationEngineDb.Assets.FirstOrDefault(a => a.Name == assetName);
        }
    }
}
