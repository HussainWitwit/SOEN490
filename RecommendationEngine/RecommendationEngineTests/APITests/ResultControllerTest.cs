using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.Application;
using Models.DB;
using Newtonsoft.Json;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.Services;
using RecommendationEngineTests.UnitTests.MockData;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace RecommendationEngineTests.APITests
{
    public class ResultControllerTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;
        private readonly TestServer _serverBad;
        private readonly HttpClient _clientBad;

        public ResultControllerTest()
        {
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<TestAssetRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<ResultService>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();

            _serverBad = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestBadRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<TestAssetRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<ResultService>().AsImplementedInterfaces();
                }));
            _clientBad = _serverBad.CreateClient();
        }

        [Test]
        public async Task GetResultList()
        {
            var response = await _client.GetAsync("api/result");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<Result> resultList = JsonConvert.DeserializeObject<List<Result>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(resultList);
            Assert.AreEqual(resultList[0].Id, MockResults.BasicDBResultList[0].RecommendationJobResultId);
        }

        [Test]
        public async Task GetResultWithAssetFilterList()
        {
            var response = await _client.GetAsync("api/result/filterByAsset/1");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<Result> resultList = JsonConvert.DeserializeObject<List<Result>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(resultList);
        }

        [Test]
        public async Task GetBadResultList()
        {
            var response = await _clientBad.GetAsync("api/result");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.InternalServerError);
        }

        [Test]
        public async Task GetWidgetMetrics()
        {
            var response = await _client.GetAsync("api/result/widgets");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<WidgetMetric> widgetList = JsonConvert.DeserializeObject<List<WidgetMetric>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(widgetList);
            Assert.AreEqual(widgetList.Find(element => element.Title == "Potential Net Savings").Value, 110);
            Assert.AreEqual(widgetList.Find(element => element.Title == "Average ROI").Value, 4191.3);
            Assert.AreEqual(widgetList.Find(element => element.Title == "Potential Losses").Value, 804);
        }

        [Test]
        public async Task GetBadWidgetList()
        {
            var response = await _clientBad.GetAsync("api/result/widgets");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.InternalServerError);
        }

        [Test]
        public async Task GetHistogram()
        {
            var response = await _client.GetAsync("api/result/histogram/44");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<HistogramItem> monthlyList = JsonConvert.DeserializeObject<List<HistogramItem>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(monthlyList);
            Assert.AreEqual(monthlyList.Find(element => element.Month == 4).Total, 23);
            Assert.AreEqual(monthlyList.Find(element => element.Month == 7).Total, 23);
            Assert.AreEqual(monthlyList.Find(element => element.Month == 10).Total, 0);
        }

        [Test]
        public async Task GetBadHistogram()
        {
            var response = await _clientBad.GetAsync("api/result/widgets");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.InternalServerError);
        }

        public class TestRepositoryMock : IResultRepository
        {
            public List<DBRecommendationJobResult> GetResultWithActions()
            {
                return MockResults.BasicDBResultList;
            }

            List<DBRecommendationJobResult> IResultRepository.GetResultList()
            {
                return MockResults.BasicDBResultList;
            }
        }

        public class TestBadRepositoryMock : IResultRepository
        {
            public List<DBRecommendationJobResult> GetResultWithActions()
            {
                return MockResults.BadDBResultList;
            }

            List<DBRecommendationJobResult> IResultRepository.GetResultList()
            {
                return MockResults.BadDBResultList;
            }
        }

        public class TestAssetRepositoryMock : IAssetRepository
        {
            public void AddAsset(DBAsset asset) { }

            public void AddAssetList(List<DBAsset> asset) { }

            public List<DBAsset> GetAssetsList()
            {
                return MockAssets.BasicDBAssetList;
            }
            public DBAsset GetAssetByName(string assetName)
            {
                return MockAssets.BasicDBAsset;
            }

            public DBAsset GetAssetById(int assetId)
            {
                return MockAssets.BasicDBAsset;
            }

            public void Update(DBAsset asset)
            {
                throw new System.NotImplementedException();
            }
        }
    }
}
