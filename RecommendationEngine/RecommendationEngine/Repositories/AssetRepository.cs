using Interfaces.Repositories;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
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
            try
            {
                _recommendationEngineDb.Assets.Add(asset);
                _recommendationEngineDb.SaveChanges();
            }
            catch (Exception) {
                throw new DbException();
            }
        }
        
        public void AddAssetList(List<DBAsset> asset)
        {
            try
            {
                _recommendationEngineDb.Assets.AddRange(asset);
                _recommendationEngineDb.SaveChanges();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public List<DBAsset> GetAssetsList()
        {
            try
            {
                return _recommendationEngineDb.Assets.ToList();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public DBAsset GetAssetByName(string assetName)
        {
            try
            {
                return _recommendationEngineDb.Assets.FirstOrDefault(a => a.Name == assetName);
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public DBAsset GetAssetById(int assetId)
        {
            try
            {
                return _recommendationEngineDb.Assets.FirstOrDefault(a => a.AssetId == assetId);
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }
    }
}
