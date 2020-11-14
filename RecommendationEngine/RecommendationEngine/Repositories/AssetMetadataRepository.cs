﻿using Interfaces.Repositories;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Repositories
{
    public class AssetMetadataRepository: IAssetMetadataRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public AssetMetadataRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }
    }
}