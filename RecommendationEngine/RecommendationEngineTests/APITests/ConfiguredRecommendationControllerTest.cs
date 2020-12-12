using System.Collections.Generic;
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
    }
}
