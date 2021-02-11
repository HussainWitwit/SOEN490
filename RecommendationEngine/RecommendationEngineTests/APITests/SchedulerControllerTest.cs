﻿using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Models.DB;
using NUnit.Framework;
using RecommendationEngine;
using RecommendationEngine.Services;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Interfaces.RecommendationScheduler;

namespace RecommendationEngineTests.APITests
{
    public class SchedulerControllerTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;
        private readonly HttpClient _badClient;
        private readonly TestServer _badServer;

        public SchedulerControllerTest()
        {
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<SchedulerService>().AsImplementedInterfaces();
                    builder.RegisterType<MockScheduler>().AsImplementedInterfaces();
                }));
            _badServer = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                    builder.RegisterType<SchedulerService>().AsImplementedInterfaces();
                    builder.RegisterType<BadMockScheduler>().AsImplementedInterfaces();
                }));
            _client = _server.CreateClient();
            _badClient = _badServer.CreateClient();
        }

        [Test]
        public async Task TriggerJob()
        {
            var response = await _client.PutAsync("api/scheduler/1", null);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task TriggerJobFailure()
        {
            var response = await _badClient.PutAsync("api/scheduler/1", null);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.BadRequest);
        }
    }

    public class MockScheduler: IRecommendationScheduler
    {
        public Task Start()
        {
            return Task.CompletedTask;
        }

        public Task ScheduleJobAsync(DBRecommendationSchedule schedule)
        {
            return Task.CompletedTask;
        }

        public Task TriggerJobAsync(int scheduleId)
        {
            return Task.CompletedTask;
        }
    }
    public class BadMockScheduler : IRecommendationScheduler
    {
        public Task Start()
        {
            throw new NotImplementedException();
        }

        public Task ScheduleJobAsync(DBRecommendationSchedule schedule)
        {
            throw new NotImplementedException();
        }

        public Task TriggerJobAsync(int scheduleId)
        {
            throw new NotImplementedException();
        }
    }
}