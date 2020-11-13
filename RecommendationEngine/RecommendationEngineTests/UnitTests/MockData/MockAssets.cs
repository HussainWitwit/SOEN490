using System;
using System.Collections.Generic;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI.APIModels;

namespace RecommendationEngineTests.UnitTests.MockData
{
    public class MockAssets
    {

        public static DBAssetType BasicAssetType = AssetList.BasicDBAssetType();
        public static DBAssetType PortfolioAssetType = AssetList.PortfolioAssetType();
        public static List<DBAsset> BasicDBAssetList = AssetList.BasicDBAssetList();
        public static DBAsset BasicDBAsset = AssetList.BasicDBAssetList()[0];
        public static List<PFPortfolio> BasicPortfolios = AssetList.BasicPortfolios();
        public static List<PFPortfolio> BasicPlants = AssetList.BasicPortfolios();
        public static PFPlant BasicPlant = AssetList.BasicPlant();

        public static class AssetList
        {
            public static DBAssetType BasicDBAssetType()
            {
                DBAssetType asset = new DBAssetType()
                {
                    AssetTypeId = 1,
                    Name = "plant",
                    DisplayText = "plant",
                    EnergyType = "pv"
                };

                return asset;
            }

            public static DBAssetType PortfolioAssetType()
            {
                DBAssetType type = new DBAssetType()
                {
                    AssetTypeId = 1,
                    Name = "Portfolio",
                    EnergyType = "energytype",
                    DisplayText = "Portfolio",
                    AssetsList = null
                };

                return type;
            }

            public static List<DBAsset> BasicDBAssetList()
            {
                List<DBAsset> list = new List<DBAsset>
                {
                    new DBAsset()
                    {
                        AssetId = 1,
                        Name = "asset1",
                        DisplayText = "asset1",
                        EnergyType = "pv",
                        ParentAsset = null,
                        Type = BasicDBAssetType()
                    },
                    new DBAsset()
                    {
                        AssetId = 2,
                        Name = "asset2",
                        DisplayText = "asset2",
                        EnergyType = "pv",
                        ParentAsset = null,
                        Type = BasicDBAssetType()
                    }
                };

                list[1].ParentAsset = list[0];

                return list;
            }

            public static List<PFPortfolio> BasicPortfolios()
            {
                List<PFPortfolio> portfolios = new List<PFPortfolio>
                {
                    new PFPortfolio()
                    {
                        Id = "TestPorfolio1",
                        Name = "TestPorfolio1"
                    },
                    new PFPortfolio()
                    {
                        Id = "TestPortfolio2",
                        Name = "TestPortfolio2"
                    }
                };

                return portfolios;
            }

            public static List<PFPortfolio> BasicPlants()
            {
                List<PFPortfolio> plants = new List<PFPortfolio>
                {
                    new PFPortfolio()
                    {
                        Id = "TestPlant1",
                        Name = "TestPlant1"
                    },
                    new PFPortfolio()
                    {
                        Id = "TestPortfolio2",
                        Name = "TestPortfolio2"
                    }
                };

                return plants;
            }

            public static PFPlant BasicPlant()
            {
                PFPlant plant = new PFPlant()
                {
                    Id = "TestPlant1",
                    Name = "TestPlant1",
                    AcCapacity = 5,
                    DataResolution = "resolution",
                    Latitude = 9,
                    Longitude = 9,
                    PortfolioId = "TestPorfolio2",
                    TimeZone = "timezoneA"
                };

                return plant;
            }
        }
    }
}
