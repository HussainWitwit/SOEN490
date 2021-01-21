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
    public class JobControllerTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;
        private readonly TestServer _serverBad;
        private readonly HttpClient _clientBad;

        public JobControllerTest()
        {
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<JobService>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();

            _serverBad = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestBadRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<JobService>().AsImplementedInterfaces();
                }));
            _clientBad = _serverBad.CreateClient();
        }

        [Test]
        public async Task GetJobList()
        {
            var response = await _client.GetAsync("api/job");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<Job> jobList = JsonConvert.DeserializeObject<List<Job>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(jobList);
            Assert.AreEqual(jobList[0].Id, MockJobs.BasicDBJobList[0].RecommendationJobId);
        }

        [Test]
        public async Task GetBadJobList()
        {
            var response = await _clientBad.GetAsync("api/job");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }

        public class TestRepositoryMock : IJobRepository
        {
            List<DBRecommendationJob> IJobRepository.GetJobList()
            {
                return MockJobs.BasicDBJobList;
            }
        }

        public class TestBadRepositoryMock : IJobRepository
        {
            List<DBRecommendationJob> IJobRepository.GetJobList()
            {
                return MockJobs.BadDBJobList;
            }
        }
    }
}
