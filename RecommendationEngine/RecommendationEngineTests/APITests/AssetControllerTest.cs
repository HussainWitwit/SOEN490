﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.Application.APIModels;
using Models.Application.Asset;
using Models.DB;
using Newtonsoft.Json;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.Services;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngineTests.UnitTests.ControllerTest
{
    public class AssetControllerTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;

        public AssetControllerTest()
        {
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<AssetService>().AsImplementedInterfaces();
                    builder.RegisterType<TestDrive>().AsImplementedInterfaces();
                    builder.RegisterType<TestAssetTypeRepositoryMock>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();
        }

        [Test]
        public async Task GetAssets()
        {
            var response = await _client.GetAsync("/asset/get");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            var asset = JsonConvert.DeserializeObject<AssetComposite>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(asset);
            Assert.AreEqual(asset.Id, MockData.MockAssets.BasicDBAssetList[0].AssetId);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task Convert()
        {
            var response = await _client.GetAsync("/asset/convert");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }
    }


    public class TestRepositoryMock : IAssetRepository
    {
        public void AddAsset(DBAsset asset) { }

        public void AddAssetList(List<DBAsset> asset) { }

        public List<DBAsset> GetAssetsList()
        {
            return MockData.MockAssets.BasicDBAssetList;
        }
        public DBAsset GetAssetByName(string assetName)
        {
            return MockData.MockAssets.BasicDBAsset;
        }
    }

    public class TestAssetTypeRepositoryMock : IAssetTypeRepository
    {
        public DBAssetType GetAssetTypeByName(string assetTypeName)
        {
            return MockData.MockAssets.PortfolioAssetType;
        }
    }

    public class TestDrive : IDriveService
    {
        public async Task<List<PFPortfolio>> GetPortfolios()
        {
            await Task.Delay(1);
            return MockData.MockAssets.BasicPortfolios;
        }
        public async Task<List<PFPortfolio>> GetPlants()
        {
            await Task.Delay(1);
            return MockData.MockAssets.BasicPlants;
        }

        public async Task<PFPlant> GetPlantById(string plantId)
        {
            await Task.Delay(1);
            return MockData.MockAssets.BasicPlant;
        }

        public async Task<List<PFPPAPrice>> GetPPAPriceByPlantId(string plantId)
        {
            await Task.Delay(1);
            return new List<PFPPAPrice>();
        }
        public async Task<List<PFMetadata>> GetAssetsMetadataByPlantIds(List<string> plantIds)
        {
            await Task.Delay(1);
            return new List<PFMetadata>();
        }
        public async Task<Dictionary<string, List<PFPredictedEnergy>>> GetDailyPredictedEnergyByPlantIds(DateTime startTime, DateTime endTime, List<string> plantIds)
        {
            await Task.Delay(1);
            return new Dictionary<string, List<PFPredictedEnergy>>();
        }

    }
}
