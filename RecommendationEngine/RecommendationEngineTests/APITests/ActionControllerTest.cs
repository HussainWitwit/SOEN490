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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Action = Models.Application.Action;

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
                    builder.RegisterType<MockAssetRepository>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();

            _serverBad = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestBadRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<ActionService>().AsImplementedInterfaces();
                    builder.RegisterType<MockAssetRepository>().AsImplementedInterfaces();
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
        public async Task GetActionsByCompoundId()
        {
            var response = await _client.GetAsync("api/action/group/1.12");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<Action> actions = JsonConvert.DeserializeObject<List<Action>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(actions);
        }

        [Test]
        public async Task GetNbActionByDay()
        {
            var response = await _client.GetAsync("api/action/calendar");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<CalendarAction> calendarActions = JsonConvert.DeserializeObject<List<CalendarAction>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(calendarActions);
            Assert.AreEqual(calendarActions.FirstOrDefault(act => act.Date.Date == new DateTime(2020, 06, 01)).NbOfActions, 1);
            Assert.AreEqual(calendarActions.FirstOrDefault(act => act.Date.Date == new DateTime(2020, 06, 05)).NbOfActions, 2);
        }

        [Test]
        public async Task GetBadActions()
        {
            var response = await _clientBad.GetAsync("api/action/9");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }

        public class TestRepositoryMock : IActionRepository
        {
            List<DBAction> IActionRepository.GetActionList()
            {
                return MockActions.CalendarActions;
            }

            List<DBAction> IActionRepository.GetActionsByResultId(int id)
            {
                return MockActions.BasicDBActions;
            }

            public List<DBAction> GetActionsByIdList(List<int> ids)
            {
                return MockActions.BasicDBActions;
            }

            List<DBAction> IActionRepository.GetActionsByDate(DateTime date)
            {
                return MockActions.BasicDBActions;
            }
        }

        public class TestBadRepositoryMock : IActionRepository
        {
            List<DBAction> IActionRepository.GetActionList()
            {
                return MockActions.CalendarActions;
            }

            List<DBAction> IActionRepository.GetActionsByResultId(int id)
            {
                return MockActions.BadDBActions;
            }

            public List<DBAction> GetActionsByIdList(List<int> ids)
            {
                return MockActions.BasicDBActions;
            }

            List<DBAction> IActionRepository.GetActionsByDate(DateTime date)
            {
                return MockActions.BadDBActions;
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

            public void Update(DBAsset asset)
            {
                throw new System.NotImplementedException();
            }
        }
    }
}