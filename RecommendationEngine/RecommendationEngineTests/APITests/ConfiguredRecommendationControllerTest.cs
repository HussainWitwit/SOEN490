using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.DB;
using Newtonsoft.Json;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.ConfiguredRecommendationServices;
using RecommendationEngineTests.UnitTests.MockData;

namespace RecommendationEngineTests.APITests
{
    public class ConfiguredRecommendationControllerTest
    {

        private readonly TestServer _server;
        private readonly HttpClient _client;

        private readonly TestServer _serverBad;
        private readonly HttpClient _clientBad;

        public ConfiguredRecommendationControllerTest()
        {
            // Arrange
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<MockTestRepository>().AsImplementedInterfaces();
                    builder.RegisterType<ConfiguredRecommendationService>().AsImplementedInterfaces();
                    builder.RegisterType<MockAssetRepository>().AsImplementedInterfaces();
                    builder.RegisterType<MockTestDrive>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();

            _serverBad = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<MockBadTestRepository>().AsImplementedInterfaces();
                    builder.RegisterType<ConfiguredRecommendationService>().AsImplementedInterfaces();
                    builder.RegisterType<MockAssetRepository>().AsImplementedInterfaces();
                    builder.RegisterType<MockTestDrive>().AsImplementedInterfaces();
                }));
            _clientBad = _serverBad.CreateClient();
        }

        [Test]
        public async Task GetRecommendations()
        {
            var response = await _client.GetAsync("api/configuredRecommendation");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task AddRecommendation()
        {
            var recommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            string json = JsonConvert.SerializeObject(recommendation);
            var body = new StringContent(json.ToString(), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("api/configuredRecommendation", body);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task GetRecommendationByIdTest()
        {
            var response = await _client.GetAsync("api/configuredRecommendation/1");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task DeleteRecommendationByIdTest()
        {
            var response = await _client.DeleteAsync("api/configuredRecommendation/1");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task EditRecommendations()
        {
            var payload = MockConfiguredRecommendations.EDITED_CONFIGURED_RECOMMENDATION;
            var response = await _client.PutAsync("api/configuredRecommendation/1", new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task GetRecommendationByIdTestBad()
        {
            var response = await _clientBad.GetAsync("api/configuredRecommendation/1");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task AddRecommendationBad()
        {
            var recommendation = MockConfiguredRecommendations.BAD_CONFIGURED_RECOMMENDATION;
            string json = JsonConvert.SerializeObject(recommendation);
            var body = new StringContent(json.ToString(), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("api/configuredRecommendation", body);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task EditRecommendationBad()
        {
            var payload = MockConfiguredRecommendations.BAD_CONFIGURED_RECOMMENDATION;
            var response = await _client.PutAsync("api/configuredRecommendation/1", new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }

    }

    public class MockTestRepository : IConfiguredRecommendationRepository
    {
        public DBRecommendationSchedule Add(DBRecommendationSchedule configuredRecommendation)
        {
            return new DBRecommendationSchedule
            {
                RecommendationScheduleId = 1
            };
        }

        public List<DBRecommendationSchedule> GetRecommendationScheduleList()
        {
            return MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST;
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            return MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
        }

        public DBRecommendationSchedule GetRecommendationScheduleById(int id)
        {
            return MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST.First();
        }

        public DBRecommendationSchedule Edit(DBRecommendationSchedule configuredRecommendation, int id) {
            return MockConfiguredRecommendations.EDITED_DB_RECOMMENDATION;
        }
        public void Delete(int id) { }
    }

    public class MockBadTestRepository : IConfiguredRecommendationRepository
    {
        public DBRecommendationSchedule Add(DBRecommendationSchedule configuredRecommendation)
        {
            return new DBRecommendationSchedule
            {
                RecommendationScheduleId = 1
            };
        }

        public List<DBRecommendationSchedule> GetRecommendationScheduleList()
        {
            return MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST;
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            return MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
        }

        public DBRecommendationSchedule GetRecommendationScheduleById(int id)
        {
            return null;
        }

        public DBRecommendationSchedule Edit(DBRecommendationSchedule configuredRecommendation, int id)
        {
            return UnitTests.MockData.MockConfiguredRecommendations.EDITED_DB_RECOMMENDATION;
        }
        public void Delete(int id) { }
    }

    public class MockAssetRepository : IAssetRepository
    {
        public void AddAsset(DBAsset asset)
        {
        }

        public void AddAssetList(List<DBAsset> asset)
        {
        }

        public List<DBAsset> GetAssetsList()
        {
            return MockAssets.BasicDBAssetList;
        }

        public DBAsset GetAssetByName(string assetName)
        {
            return MockAssets.BasicDBAssetList[2];
        }

        public DBAsset GetAssetById(int assetId)
        {
            return MockAssets.BasicDBAssetList[2];
        }
    }
}
