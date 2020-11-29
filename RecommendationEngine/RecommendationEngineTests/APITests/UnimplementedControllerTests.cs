using System;
using Interfaces.Repositories;
using Moq;
using NUnit.Framework;
using RecommendationEngine.Controllers;
using RecommendationEngine.Services;
using Interfaces.Services.ExternalAPI;
using Interfaces.Services;

namespace RecommendationEngineTests.APITests
{
    public class UnimplementedControllerTests
    {
        private Mock<IDriveService> _drive;

        private Mock<IActionRepository> _actionRepo;
        private ActionService _actionService;
        private ActionController _actionController;

        private AssetMetadataService _assetMetadataService;
        private AssetMetadataController _assetMetadataController;

        private CaseService _caseService;
        private CaseController _caseController;

        private Mock<IEnergyMarketRepository> _energyMarketRepo;
        private EnergyMarketService _energyMarketService;
        private EnergyMarketController _energyMarketController;

        private Mock<IEventRepository> _eventRepo;
        private EventService _eventService;
        private EventController _eventController;

        private Mock<IRecommendationEngineRepository> _recommendationEngineRepo;
        private RecommendationEngineService _recommendationEngineService;
        private RecommendationEngineController _recommendationEngineController;

        private RecommendationRunService _recommendationRunService;
        private RecommendationRunController _recommendationRunController;

        private TimeSeriesDataService _timeSeriesDataService;
        private TimeSeriesDataController _timeSeriesDataController;

        private WorkOrderService _workOrderService;
        private WorkOrderController _workOrderController;

        [SetUp]
        public void Setup()
        {

            _actionController = new ActionController(_actionService);
            _assetMetadataController = new AssetMetadataController(_assetMetadataService);
            _caseController = new CaseController(_caseService);
            _energyMarketController = new EnergyMarketController(_energyMarketService);
            _eventController = new EventController(_eventService);
            _recommendationEngineController = new RecommendationEngineController(_recommendationEngineService);
            _recommendationRunController = new RecommendationRunController(_recommendationRunService);
            _timeSeriesDataController = new TimeSeriesDataController(_timeSeriesDataService);
            _workOrderController = new WorkOrderController(_workOrderService);
        }

        [Test]
        public void Tests()
        {
            Assert.IsNotNull(_actionController);
            Assert.IsNotNull(_assetMetadataController);
            Assert.IsNotNull(_caseController);
            Assert.IsNotNull(_energyMarketController);
            Assert.IsNotNull(_caseController);
            Assert.IsNotNull(_eventController);
            Assert.IsNotNull(_recommendationEngineController);
            Assert.IsNotNull(_recommendationRunController);
            Assert.IsNotNull(_timeSeriesDataController);
            Assert.IsNotNull(_workOrderController);
        }
    }
}
    

