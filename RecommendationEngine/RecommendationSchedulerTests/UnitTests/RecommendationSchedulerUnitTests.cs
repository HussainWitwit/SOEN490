using Interfaces.Repositories;
using Microsoft.Extensions.Configuration;
using Models.DB;
using Moq;
using NUnit.Framework;
using Quartz;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace RecommendationSchedulerTests.UnitTests
{
    public class RecommendationSchedulerUnitTests
    {
        private Mock<IScheduler> _schedulerMock;
        private Mock<IRecommendationSchedulerRepository> _recommendationSchedulerRepoMock;
        private Mock<IConfiguration> _configurationMock;
        private RecommendationScheduler.RecommendationScheduler _recommendationScheduler;

        [SetUp]
        public void Setup()
        {
            _schedulerMock = new Mock<IScheduler>();
            _recommendationSchedulerRepoMock = new Mock<IRecommendationSchedulerRepository>();
            _configurationMock = new Mock<IConfiguration>();
            _recommendationScheduler = new RecommendationScheduler.RecommendationScheduler(_schedulerMock.Object, _recommendationSchedulerRepoMock.Object, _configurationMock.Object);
        }

        [Test]
        public void TestStartNoScheduleOnStart()
        {
            //Arrange
            _configurationMock.SetupGet(x => x["Scheduler:ScheduleOnStartup"]).Returns("false");
            _schedulerMock.Setup(x => x.Start(CancellationToken.None)).Returns(Task.CompletedTask);

            //Assert
            _schedulerMock.Verify(x => x.Start(CancellationToken.None), Times.Once);
        }

        [Test]
        public async Task TestStartScheduleOnStartWithJobsAsync()
        {
            //Arrange
            var mockConfSection = new Mock<IConfigurationSection>();
            _configurationMock.SetupGet(x => x["Scheduler:ScheduleOnStartup"]).Returns("true");
            _schedulerMock.Setup(x => x.Start(CancellationToken.None)).Returns(Task.CompletedTask);
            _recommendationSchedulerRepoMock.Setup(x => x.GetDbRecommendationSchedules()).Returns(
                new List<DBRecommendationSchedule>
                {
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 1,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Yearly",
                        RecurrenceDayOfWeek = 0,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 1
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 2,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Monthly",
                        RecurrenceDayOfWeek = 1,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 2
                                }
                            }
                        }
                    },
                     new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 3,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Weekly",
                        RecurrenceDayOfWeek = 2,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 3
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 4,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Weekly",
                        RecurrenceDayOfWeek = 3,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 4
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 5,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Weekly",
                        RecurrenceDayOfWeek = 4,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 5
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 6,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Weekly",
                        RecurrenceDayOfWeek = 5,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 6
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 7,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Weekly",
                        RecurrenceDayOfWeek = 6,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 7
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 8,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Weekly",
                        RecurrenceDayOfWeek = 0,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 8
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 9,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Weekly",
                        RecurrenceDayOfWeek = 1,
                        AssetsList = new List<DBAssetRecommendationSchedule>
                        {
                            new DBAssetRecommendationSchedule
                            {
                                Asset = new DBAsset
                                {
                                    AssetId = 9
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 10,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Yearly Wash Optimization"
                        },
                        Granularity = "Yearly",
                        RecurrenceDayOfWeek = 0,
                    },
                }
            );
            _schedulerMock.Setup(x => x.ScheduleJob(It.IsAny<IJobDetail>(), It.IsAny<ITrigger>(), CancellationToken.None)).ReturnsAsync(DateTimeOffset.Now);

            // Act
            await _recommendationScheduler.Start();
            //Assert
            _schedulerMock.Verify(x => x.Start(CancellationToken.None), Times.AtLeastOnce);
            _recommendationSchedulerRepoMock.Verify(x => x.GetDbRecommendationSchedules(), Times.Once);
            _schedulerMock.Verify(x => x.ScheduleJob(It.IsAny<IJobDetail>(), It.IsAny<ITrigger>(), CancellationToken.None), Times.Exactly(9));
        }

        [Test]
        public async Task TestStartScheduleOnStartWithNoJobAsync()
        {
            //Arrange
            var mockConfSection = new Mock<IConfigurationSection>();
            _configurationMock.SetupGet(x => x["Scheduler:ScheduleOnStartup"]).Returns("true");
            _schedulerMock.Setup(x => x.Start(CancellationToken.None)).Returns(Task.CompletedTask);
            _recommendationSchedulerRepoMock.Setup(x => x.GetDbRecommendationSchedules()).Returns(
                new List<DBRecommendationSchedule>()
            );
            _schedulerMock.Setup(x => x.ScheduleJob(It.IsAny<IJobDetail>(), It.IsAny<ITrigger>(), CancellationToken.None)).ReturnsAsync(DateTimeOffset.Now);

            // Act
            await _recommendationScheduler.Start();

            //Assert
            _schedulerMock.Verify(x => x.Start(CancellationToken.None), Times.AtLeastOnce);
            _recommendationSchedulerRepoMock.Verify(x => x.GetDbRecommendationSchedules(), Times.Once);
            _schedulerMock.Verify(x => x.ScheduleJob(It.IsAny<IJobDetail>(), It.IsAny<ITrigger>(), CancellationToken.None), Times.Never);
        }

        [Test]
        public async Task TestTriggerScheduleAsync()
        {
            //Arrange
            var mockConfSection = new Mock<IConfigurationSection>();
            _schedulerMock.Setup(x => x.TriggerJob(It.IsAny<JobKey>(),It.IsAny<JobDataMap>(),CancellationToken.None)).Returns(Task.CompletedTask);
            _recommendationSchedulerRepoMock.Setup(x => x.GetDbRecommendationScheduleById(1)).Returns(
                    new DBRecommendationSchedule
                    {
                        AssetsList = new List<DBAssetRecommendationSchedule> {
                            new DBAssetRecommendationSchedule {
                                Asset = new DBAsset
                                {
                                    AssetId = 9
                                }
                            }
                        }
                    });
            // Act
            await _recommendationScheduler.TriggerScheduleAsync(1);

            //Assert
            _schedulerMock.Verify(x => x.TriggerJob(It.IsAny<JobKey>(), It.IsAny<JobDataMap>(), CancellationToken.None), Times.AtLeastOnce);
        }

        [Test]
        public void DisposeTest()
        {
            //Arrange
            _schedulerMock.Setup(x => x.Shutdown(CancellationToken.None)).Returns(Task.CompletedTask);

            // Act
            _recommendationScheduler.Dispose();

            //Assert
            _schedulerMock.Verify(x => x.Shutdown(CancellationToken.None), Times.Once);
        }
    }
}