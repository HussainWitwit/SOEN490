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
                    builder.RegisterType<TestAssetRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<JobService>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();

            _serverBad = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<TestBadRepositoryMock>().AsImplementedInterfaces();
                    builder.RegisterType<TestAssetRepositoryMock>().AsImplementedInterfaces();
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
        public async Task GetJobListWithAsset()
        {
            var response = await _client.GetAsync("api/job/filterByAsset/2");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task GetBadJobList()
        {
            var response = await _clientBad.GetAsync("api/job");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.InternalServerError);
        }

        [Test]
        public async Task GetJobLogList()
        {
            var response = await _client.GetAsync("api/job/log/1");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            List<JobLog> jobList = JsonConvert.DeserializeObject<List<JobLog>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(jobList);
            Assert.AreEqual(jobList[0].Id, 1);
            Assert.AreEqual(jobList[0].Description, "Test");
        }

        [Test]
        public async Task GetBadJobLogList()
        {
            var response = await _clientBad.GetAsync("api/job/log/1");
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }

        public class TestRepositoryMock : IJobRepository
        {
            public List<DBRecommendationJobLog> GetJobLogById(int id)
            {
                return MockJobs.BasicDBJobLogList;
            }

            List<DBRecommendationJob> IJobRepository.GetJobList()
            {
                return MockJobs.BasicDBJobList;
            }
        }

        public class TestAssetRepositoryMock : IAssetRepository
        {
            public void AddAsset(DBAsset asset) { }

            public void AddAssetList(List<DBAsset> asset) { }

            public List<DBAsset> GetAssetsList()
            {
                return MockAssets.BasicDBAssetList;
            }
            public DBAsset GetAssetByName(string assetName)
            {
                return MockAssets.BasicDBAsset;
            }

            public DBAsset GetAssetById(int assetId)
            {
                return MockAssets.BasicDBAsset;
            }
        }

        public class TestBadRepositoryMock : IJobRepository
        {
            public List<DBRecommendationJobLog> GetJobLogById(int id)
            {
                return MockJobs.BadDBJobLogList;
            }

            List<DBRecommendationJob> IJobRepository.GetJobList()
            {
                return MockJobs.BadDBJobList;
            }
        }
    }
}
