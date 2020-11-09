using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Interfaces.Services.ExternalApi;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.DB;
using Newtonsoft.Json;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.ConfiguredRecommendationServices;
using RecommendationEngine.Models.Application;
using RecommendationEngine.Services.ExternalAPI.APIModels;

namespace RecommendationEngineTests.UnitTests.ControllerTest
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
        public async Task AddRecommendations()
        {
            var payload = MockData.MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            var response = await _client.PutAsync("/configuredrecommendation/add", new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
            Assert.AreEqual(response.ReasonPhrase, "Method Not Allowed");
        }
    }

    public class MockTestRepository : IConfiguredRecommendationRepository
    {
        public void Add(DBRecommendationSchedule configuredRecommendation) { }

        public List<ConfiguredRecommendation> Get()
        {
            return MockData.MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST;
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            return MockData.MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
        }
    }

    public class MockTestDrive : IDriveService
    {
        public async Task<List<PFPortfolio>> GetPortfolios()
        {
            await Task.Delay(1000);
            return MockData.MockAssets.BasicPortfolios;
        }
        public async Task<List<PFPortfolio>> GetPlants()
        {
            await Task.Delay(1000);
            return MockData.MockAssets.BasicPlants;
        }

        public async Task<PFPlant> GetPlantByPortfolioId(string portfolioId)
        {
            await Task.Delay(1000);
            return MockData.MockAssets.BasicPlant;
        }
    }
}
