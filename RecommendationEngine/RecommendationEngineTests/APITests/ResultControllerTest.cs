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
                    builder.RegisterType<ResultService>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();

            _serverBad = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestBadRepositoryMock>().AsImplementedInterfaces();
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
        public async Task GetBadResultList()
        {
            var response = await _clientBad.GetAsync("api/result");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.InternalServerError);
        }

        public class TestRepositoryMock : IResultRepository
        {
            List<DBRecommendationJobResult> IResultRepository.GetResultList()
            {
                return MockResults.BasicDBResultList;
            }
        }

        public class TestBadRepositoryMock : IResultRepository
        {
            List<DBRecommendationJobResult> IResultRepository.GetResultList()
            {
                return MockResults.BadDBResultList;
            }
        }
    }
}
