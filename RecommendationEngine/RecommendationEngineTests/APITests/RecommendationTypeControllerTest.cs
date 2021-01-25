using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.DB;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.Services;
using RecommendationEngineTests.UnitTests.MockData;

namespace RecommendationEngineTests.APITests
{
    public class RecommendationTypeControllerTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;

        public RecommendationTypeControllerTest()
        {
            // Arrange
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<MockRecommendationTypeRepository>().AsImplementedInterfaces();
                    builder.RegisterType<RecommendationTypeService>().AsImplementedInterfaces();
                    builder.RegisterType<MockTestDrive>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();
        }

        [Test]
        public async Task GetRecommendationTypes()
        {
            var response = await _client.GetAsync("api/recommendationType");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }
    }

    public class MockRecommendationTypeRepository : IRecommendationTypeRepository
    {
        public List<DBRecommendationType> GetRecommendationTypes()
        {
            List<DBRecommendationType> config = MockConfiguredRecommendations.RECOMMENDATION_TYPE;
            return config;
        }
    }
}
