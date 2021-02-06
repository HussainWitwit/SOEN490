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
    public class ActionControllerTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;
        private readonly TestServer _serverBad;
        private readonly HttpClient _clientBad;

        public ActionControllerTest()
        {
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<ActionService>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();

            _serverBad = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestBadRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<ActionService>().AsImplementedInterfaces();
                }));
            _clientBad = _serverBad.CreateClient();
        }

        [Test]
        public async Task GetActionsByResultId()
        {
            var response = await _client.GetAsync("api/action/9");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            ActionGrouping actions = JsonConvert.DeserializeObject<ActionGrouping>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(actions);
            Assert.AreEqual(actions.RecommendationName, MockActions.BasicDBActions[0].RecommendationJobResult.Job.Schedule.Name);
            Assert.AreEqual(actions.Actions[0].recommendedDate, MockActions.BasicDBActions[0].Date);
        }

        [Test]
        public async Task GetBadActions()
        {
            var response = await _clientBad.GetAsync("api/action/9");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }

        public class TestRepositoryMock : IActionRepository
        {
            List<DBAction> IActionRepository.GetActionsByResultId(int id)
            {
                return MockActions.BasicDBActions;
            }
        }

        public class TestBadRepositoryMock : IActionRepository
        {
            List<DBAction> IActionRepository.GetActionsByResultId(int id)
            {
                return MockActions.BadDBActions;
            }
        }
    }
}