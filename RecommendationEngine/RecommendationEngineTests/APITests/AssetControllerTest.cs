using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Interfaces.Services;
using Interfaces.Services.ExternalAPI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.Application.APIModels;
using Models.Application.Asset;
using Models.DB;
using Newtonsoft.Json;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Services;
using RecommendationEngineTests.APITests;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace RecommendationEngineTests.UnitTests.ControllerTest
{
    public class AssetControllerTest
    {
        private readonly TestServer _server;
        private readonly TestServer _serverBad;

        private readonly HttpClient _client;
        private readonly HttpClient _clientBad;


        public AssetControllerTest()
        {
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<AssetService>().AsImplementedInterfaces();
                    builder.RegisterType<MockTestDrive>().AsImplementedInterfaces();
                    builder.RegisterType<TestAssetTypeRepositoryMock>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();

            _serverBad = new TestServer(new WebHostBuilder()
               .UseStartup<Startup>()
               .ConfigureServices(services => services.AddAutofac())
               .ConfigureTestContainer<ContainerBuilder>(builder =>
               {
                   builder.RegisterType<TestRepositoryMock>().AsImplementedInterfaces();
                   builder.RegisterType<AssetServiceMock>().AsImplementedInterfaces();
                   builder.RegisterType<MockTestDrive>().AsImplementedInterfaces();
                   builder.RegisterType<TestAssetTypeRepositoryMock>().AsImplementedInterfaces();
               }));
            _clientBad = _serverBad.CreateClient();
        }

        [Test]
        public async Task GetAssetsNested()
        {
            var response = await _client.GetAsync("/asset/getAssetsNested");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            var asset = JsonConvert.DeserializeObject<AssetComposite>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(asset);
            Assert.AreEqual(asset.Id, MockData.MockAssets.BasicDBAssetList[0].AssetId);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task GetAssetsList()
        {
            var response = await _client.GetAsync("/asset/getAssetsList");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<AssetLeaf> assetList = JsonConvert.DeserializeObject<List<AssetLeaf>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(assetList);
            Assert.AreEqual(assetList[0].Name, MockData.MockAssets.BasicDBAssetList[0].Name);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task Convert()
        {
            var response = await _client.GetAsync("/asset/convert");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        //Tests with exceptions being thrown
        [Test]
        public async Task GetAssetsNestedBad()
        {
            var response = await _clientBad.GetAsync("/asset/getAssetsNested");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
     
        }

        [Test]
        public async Task GetAssetsListBad()
        {
            var response = await _clientBad.GetAsync("/asset/getAssetsList");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task ConvertBad()
        {
            var response = await _clientBad.GetAsync("/asset/convert");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
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

        public DBAsset GetAssetById(int assetId)
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

    public class AssetServiceMock : IAssetService
    {
        Task IAssetService.Convert()
        {
            throw new GlobalException(400, "a", "b", "c");
        }

        Asset IAssetService.GetAssetByName(string assetName)
        {
            throw new GlobalException(400, "a", "b", "c");
        }

        List<AssetLeaf> IAssetService.GetAssetsList()
        {
            throw new GlobalException(400, "a", "b", "c");
        }

        Asset IAssetService.GetAssetsTreeview()
        {
            throw new GlobalException(400, "a", "b", "c");
        }
    }
}
