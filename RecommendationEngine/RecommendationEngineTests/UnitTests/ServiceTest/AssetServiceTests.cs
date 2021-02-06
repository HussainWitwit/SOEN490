using Interfaces.Repositories;
using Models.Application.Asset;
using Models.DB;
using Moq;
using NUnit.Framework;
using RecommendationEngine.Services;
using RecommendationEngineTests.UnitTests.MockData;
using System.Collections.Generic;
using Interfaces.Services.ExternalApi;

namespace RecommendationEngineTests
{
    public class AssetServiceTests
    {
        private Mock<IAssetRepository> _assetRepoMock;
        private Mock<IAssetTypeRepository> _assetTypeRepoMock;
        private Mock<IAssetDriveService> _assetDriveMock;
        private AssetService _assetServiceMock;
        private Mock<IMetadataDriveService> _metadataDriveMock;

        [SetUp]
        public void Setup()
        {
            _assetRepoMock = new Mock<IAssetRepository>();
            _assetTypeRepoMock = new Mock<IAssetTypeRepository>();
            _assetDriveMock = new Mock<IAssetDriveService>();
            _metadataDriveMock = new Mock<IMetadataDriveService>();
            _assetServiceMock = new AssetService(_assetDriveMock.Object, _assetRepoMock.Object, _assetTypeRepoMock.Object, _metadataDriveMock.Object);
            List<DBAsset> dbAssets = MockAssets.BasicDBAssetList;
            _assetRepoMock.Setup(x => x.GetAssetsList()).Returns(dbAssets);
        }

        [Test]
        public void GetAssetsTreeviewTest()
        {
            var assetComposite = _assetServiceMock.GetAssetsTreeview();

            //Assert
            Assert.IsInstanceOf(typeof(AssetComposite), assetComposite);
            Assert.NotNull(assetComposite);
            _assetRepoMock.Verify(x => x.GetAssetsList(), Times.AtLeastOnce());
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