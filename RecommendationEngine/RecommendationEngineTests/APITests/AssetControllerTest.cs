using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.Application.Asset;
using Models.DB;
using Newtonsoft.Json;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.Services;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngine.Services.ExternalAPI.APIModels;

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
        public void AddSingleDBAsset(DBAsset asset) { }

        public void AddDBAssetList(List<DBAsset> asset) { }

        public List<DBAsset> Get()
        {
            return MockData.MockAssets.BasicDBAssetList;
        }
        public DBAsset GetAssetByName(string assetName)
        {
            return MockData.MockAssets.BasicDBAsset;
        }
    }

    public class TestDrive : IDriveService
    {
        public async Task<List<PFPortfolio>> GetPortfolios()
        {
            return MockData.MockAssets.BasicPortfolios;
        }
        public async Task<List<PFPortfolio>> GetPlants()
        {
            return MockData.MockAssets.BasicPlants;
        }

        public async Task<PFPlant> GetPlantByPortfolioId(string portfolioId)
        {
            return MockData.MockAssets.BasicPlant;
        }
    }
}
