using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Microsoft.Extensions.Configuration;
using Models.DB;
using Moq;
using NUnit.Framework;
using Quartz;

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
            _schedulerMock.Verify(x=>x.Start(CancellationToken.None), Times.Once);
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
                                    AssetId = 1
                                }
                            }
                        }
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 3,
                        RecommendationType = new DBRecommendationType
                        {
                            Type = "Fuse Replacement"
                        },
                        Granularity = "Weekly",
                        RecurrenceDayOfWeek = 2,
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
                                    AssetId = 1
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
                                    AssetId = 1
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
                                    AssetId = 1
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
                                    AssetId = 1
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
                                    AssetId = 1
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
                                    AssetId = 1
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
            _recommendationSchedulerRepoMock.Verify(x=>x.GetDbRecommendationSchedules(), Times.Once);
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