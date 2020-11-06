using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Interfaces.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.Services;

namespace RecommendationEngineTests.APITests
{
    public class TestAPITests
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;

        public TestAPITests()
        {
            // Arrange
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<TestService>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();
        }

        [Test]
        public async Task ReturnHelloWorld()
        {
            // Act
            var response = await _client.GetAsync("/weatherforecast");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);

            var forecast = JsonConvert.DeserializeObject<WeatherForecast[]>(await response.Content.ReadAsStringAsync());
            Assert.GreaterOrEqual(forecast.Length, 5);
        }
    }

    public class TestRepositoryMock : ITestRepository
    {
        public string[] GetSummaries()
        {
            return new[] { "test", "test", "test", "test", "test" };
        }
    }
}