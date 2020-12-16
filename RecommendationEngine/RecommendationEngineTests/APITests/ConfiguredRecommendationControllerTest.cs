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
        }

        [Test]
        public async Task GetRecommendations()
        {
            var response = await _client.GetAsync("/configuredrecommendation/get");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task AddRecommendation()
        {
            var recommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            string json = JsonConvert.SerializeObject(recommendation);
            var body = new StringContent(json.ToString(), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/configuredrecommendation/add", body);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task GetRecommendationByIdTest()
        {
            var response = await _client.GetAsync("/configuredrecommendation/configuredrecommendation/1");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            var expected = response.Content;
        }

        [Test]
        public async Task EditRecommendations()
        {
            var payload = UnitTests.MockData.MockConfiguredRecommendations.EDITED_DB_RECOMMENDATION;
            var response = await _client.PutAsync("/configuredrecommendation/edit/1", new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
            Assert.AreEqual(response.ReasonPhrase, "Method Not Allowed");
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
            return UnitTests.MockData.MockConfiguredRecommendations.EDITED_DB_RECOMMENDATION;
        }
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
            return new List<DBAsset>();
        }

        public DBAsset GetAssetByName(string assetName)
        {
            return new DBAsset();
        }

        public DBAsset GetAssetById(int assetId)
        {
            return new DBAsset();
        }
    }
}
