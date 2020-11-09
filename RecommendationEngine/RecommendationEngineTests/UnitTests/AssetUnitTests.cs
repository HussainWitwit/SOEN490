using System.Collections.Generic;
using Interfaces.Repositories;
using Interfaces.Services.ExternalApi;
using Models.Application.Asset;
using Models.DB;
using Moq;
using NUnit.Framework;
using RecommendationEngine.Services;
using RecommendationEngineTests.UnitTests.MockData;

namespace RecommendationEngineTests
{
    public class AssetUnitTests
    {
        private Mock<IAssetRepository> _assetRepoMock;
        private Mock<IAssetTypeRepository> _assetTypeRepoMock;
        private Mock<IDriveService> _driveMock;
        private AssetService _assetServiceMock;

        [SetUp]
        public void Setup()
        {
            _assetRepoMock = new Mock<IAssetRepository>();
            _assetTypeRepoMock = new Mock<IAssetTypeRepository>();
            _driveMock = new Mock<IDriveService>();
            _assetServiceMock = new AssetService(_driveMock.Object, _assetRepoMock.Object, _assetTypeRepoMock.Object);
            List<DBAsset> dbAssets = MockAssets.BasicDBAssetList;
            _assetRepoMock.Setup(x => x.Get()).Returns(dbAssets);
        }

        [Test]
        public void GetAssetsTreeviewTest()
        {
            var assetComposite = _assetServiceMock.GetAssetsTreeview();

            //Assert
            Assert.IsInstanceOf(typeof(AssetComposite), assetComposite);
            Assert.NotNull(assetComposite);
            _assetRepoMock.Verify(x => x.Get(), Times.AtLeastOnce());
        }

        [Test]
        public void GetAssetByNameTest()
        {
            string assetName = "asset1";
            DBAsset dbAsset = MockAssets.BasicDBAsset;
            _assetRepoMock.Setup(x => x.GetAssetByName(assetName)).Returns(dbAsset);
            _assetTypeRepoMock.Setup(x => x.GetAssetTypeByName("Portfolio")).Returns(MockAssets.PortfolioAssetType);
            Asset asset = _assetServiceMock.GetAssetByName(assetName);
            _assetRepoMock.Verify(x => x.GetAssetByName(assetName), Times.AtLeastOnce());
            Assert.NotNull(asset);
            Assert.AreEqual(asset.Id, 1);
            Assert.IsInstanceOf(typeof(Asset), asset);
        }
    }
}