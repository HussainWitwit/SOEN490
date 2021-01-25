using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.DB;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.Services;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace RecommendationEngineTests.APITests
{
    public class AdminControllerTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;

        public AdminControllerTest()
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
        }

        [Test]
        public async Task Convert()
        {
            var response = await _client.GetAsync("api/admin/convert");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }
    }

    public class TestRepositoryMock : IAssetRepository
    {
        public void AddAsset(DBAsset asset) { }

        public void AddAssetList(List<DBAsset> asset) { }

        public List<DBAsset> GetAssetsList()
        {
            return UnitTests.MockData.MockAssets.BasicDBAssetList;
        }
        public DBAsset GetAssetByName(string assetName)
        {
            return UnitTests.MockData.MockAssets.BasicDBAsset;
        }

        public DBAsset GetAssetById(int assetId)
        {
            return UnitTests.MockData.MockAssets.BasicDBAsset;
        }
    }

    public class TestAssetTypeRepositoryMock : IAssetTypeRepository
    {
        public DBAssetType GetAssetTypeByName(string assetTypeName)
        {
            return UnitTests.MockData.MockAssets.PortfolioAssetType;
        }
    }
}
