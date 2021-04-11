using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RecommendationEngine.Repositories
{
    public class AssetRepository : IAssetRepository
    {
        private readonly RecommendationEngineDBContext _recommendationEngineDb;

        public AssetRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public void Update(DBAsset asset)
        {
            try
            {
                DBAsset foundAsset = _recommendationEngineDb.Assets.Where(x => x.Name == asset.Name).FirstOrDefault();

                if (foundAsset != null)
                {
                    foundAsset.DisplayText = asset.DisplayText;
                    foundAsset.AcPower = asset.AcPower;
                    foundAsset.ParentAsset = asset.ParentAsset;
                    foundAsset.ElementPath = asset.ElementPath;
                    foundAsset.EnergyType = asset.EnergyType;
                }
                else
                {
                    _recommendationEngineDb.Assets.Add(asset);
                }
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public void AddAsset(DBAsset asset)
        {
            try
            {
                DBAsset foundClient = _recommendationEngineDb.Assets.Where(x => x.Name == asset.Name).FirstOrDefault();

                if (foundClient == null)
                {
                    _recommendationEngineDb.Assets.Add(asset);
                    _recommendationEngineDb.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw new DbException();
            }

        }
        
        public void AddAssetList(List<DBAsset> assets)
        {
            try
            {
                assets.ForEach(asset => Update(asset) );
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
                return _recommendationEngineDb.Assets.Include(x => x.Type).Include(asset => asset.ParentAsset).ToList();
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
                return _recommendationEngineDb.Assets.Include(asset => asset.Type).FirstOrDefault(a => a.Name == assetName);
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
                return _recommendationEngineDb.Assets.Include(asset => asset.Type).FirstOrDefault(a => a.AssetId == assetId);
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }
    }
}
