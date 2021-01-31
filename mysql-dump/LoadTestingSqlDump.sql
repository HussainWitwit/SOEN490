CREATE DATABASE  IF NOT EXISTS `RecommendationEngine` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `RecommendationEngine`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: RecommendationEngine
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Action`
--

DROP TABLE IF EXISTS `Action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Action` (
  `ActionId` int NOT NULL AUTO_INCREMENT,
  `Title` longtext,
  `DisplayText` longtext,
  `Date` datetime NOT NULL,
  `AssetId` int DEFAULT NULL,
  `WorkOrderOpenedWorkOrderId` int DEFAULT NULL,
  `RecommendationJobResultId` int DEFAULT NULL,
  PRIMARY KEY (`ActionId`),
  KEY `IX_Action_AssetId` (`AssetId`),
  KEY `IX_Action_RecommendationJobResultId` (`RecommendationJobResultId`),
  KEY `IX_Action_WorkOrderOpenedWorkOrderId` (`WorkOrderOpenedWorkOrderId`),
  CONSTRAINT `FK_Action_Asset_AssetId` FOREIGN KEY (`AssetId`) REFERENCES `Asset` (`AssetId`) ON DELETE RESTRICT,
  CONSTRAINT `FK_Action_RecommendationJobResult_RecommendationJobResultId` FOREIGN KEY (`RecommendationJobResultId`) REFERENCES `RecommendationJobResult` (`RecommendationJobResultId`) ON DELETE CASCADE,
  CONSTRAINT `FK_Action_WorkOrder_WorkOrderOpenedWorkOrderId` FOREIGN KEY (`WorkOrderOpenedWorkOrderId`) REFERENCES `WorkOrder` (`WorkOrderId`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Action`
--

LOCK TABLES `Action` WRITE;
/*!40000 ALTER TABLE `Action` DISABLE KEYS */;
/*!40000 ALTER TABLE `Action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Asset`
--

DROP TABLE IF EXISTS `Asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Asset` (
  `AssetId` int NOT NULL AUTO_INCREMENT,
  `Name` longtext,
  `DisplayText` longtext,
  `EnergyType` longtext,
  `TimeZone` longtext,
  `ElementPath` longtext,
  `AcPower` double NOT NULL,
  `ParentAssetAssetId` int DEFAULT NULL,
  `TypeAssetTypeId` int DEFAULT NULL,
  PRIMARY KEY (`AssetId`),
  KEY `IX_Asset_ParentAssetAssetId` (`ParentAssetAssetId`),
  KEY `IX_Asset_TypeAssetTypeId` (`TypeAssetTypeId`),
  CONSTRAINT `FK_Asset_Asset_ParentAssetAssetId` FOREIGN KEY (`ParentAssetAssetId`) REFERENCES `Asset` (`AssetId`) ON DELETE RESTRICT,
  CONSTRAINT `FK_Asset_AssetType_TypeAssetTypeId` FOREIGN KEY (`TypeAssetTypeId`) REFERENCES `AssetType` (`AssetTypeId`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Asset`
--

LOCK TABLES `Asset` WRITE;
/*!40000 ALTER TABLE `Asset` DISABLE KEYS */;
INSERT INTO `Asset` VALUES (1,'RENEW01_2070','RENEW01_2070',NULL,NULL,NULL,0,NULL,NULL),(2,'RENEW01_2070.03','RENEW01_2070.03',NULL,NULL,'RENEW01_2070.03',0,1,1),(3,'RENEW01_2070.92','CEI IV-1',NULL,NULL,'RENEW01_2070.92',0,1,1),(4,'RENEW01_2070.93','CEI IV-2',NULL,NULL,'RENEW01_2070.93',0,1,1),(5,'RENEW01_2070.94','RENEW01_2070.94',NULL,NULL,'RENEW01_2070.94',0,1,1),(6,'RENEW01_2070.95','CEI VII',NULL,NULL,'RENEW01_2070.95',0,1,1),(7,'RENEW01_2070.92.005','Bizzell Church 2','PV','Eastern Standard Time','RENEW01_2070.92.005',4950,3,2),(8,'RENEW01_2070.93.006','Nickelson 2','PV','Eastern Standard Time','RENEW01_2070.93.006',4998,4,2),(9,'RENEW01_2070.93.007','Orchard Ranch','PV','US Mountain Standard Time','RENEW01_2070.93.007',20000,4,2),(10,'RENEW01_2070.93.008','Siler City 2','PV','Eastern Standard Time','RENEW01_2070.93.008',4973,4,2),(11,'RENEW01_2070.93.009','Simcoe','PV','US Mountain Standard Time','RENEW01_2070.93.009',20000,4,2),(12,'RENEW01_2070.93.010','Trinity Solar','PV','Eastern Standard Time','RENEW01_2070.93.010',5000,4,2),(13,'RENEW01_2070.93.011','Bearford II','PV','Eastern Standard Time','RENEW01_2070.93.011',4950,4,2),(14,'RENEW01_2070.93.012','Bo Biggs','PV','Eastern Standard Time','RENEW01_2070.93.012',4973,4,2),(15,'RENEW01_2070.93.005','Nash 97-2','PV','Eastern Standard Time','RENEW01_2070.93.005',4973,4,2),(16,'RENEW01_2070.94.001','Cal Flats 130','PV','Pacific Standard Time','RENEW01_2070.94.001',130000,5,2),(17,'RENEW01_2070.94.003','Hooper','PV','US Mountain Standard Time','RENEW01_2070.94.003',52000,5,2),(18,'RENEW01_2070.94.005','Kingbird A','PV','Pacific Standard Time','RENEW01_2070.94.005',20725,5,2),(19,'RENEW01_2070.94.006','Kingbird B','PV','Pacific Standard Time','RENEW01_2070.94.006',20725,5,2),(20,'RENEW01_2070.94.009','Maryland Solar','PV','Eastern Standard Time','RENEW01_2070.94.009',23760,5,2),(21,'RENEW01_2070.94.010','Moapa Solar','PV','Pacific Standard Time','RENEW01_2070.94.010',257740,5,2),(22,'RENEW01_2070.94.011','Mt. Signal 3','PV','Pacific Standard Time','RENEW01_2070.94.011',259200,5,2),(23,'RENEW01_2070.94.012','Quinto','PV','Pacific Standard Time','RENEW01_2070.94.012',108000,5,2),(24,'RENEW01_2070.94.002','Cal Flats 150','PV','Pacific Standard Time','RENEW01_2070.94.002',178200,5,2),(25,'RENEW01_2070.93.004','Murphy Flats','PV','US Mountain Standard Time','RENEW01_2070.93.004',20000,4,2),(26,'RENEW01_2070.93.003','Meadowlark','PV','Eastern Standard Time','RENEW01_2070.93.003',4998,4,2),(27,'RENEW01_2070.93.002','American Falls 2','PV','US Mountain Standard Time','RENEW01_2070.93.002',20000,4,2),(28,'RENEW01_2070.92.003','Beacon 5','PV','Pacific Standard Time','RENEW01_2070.92.003',37200,3,2),(29,'RENEW01_2070.92.002','Beacon 2','PV','Pacific Standard Time','RENEW01_2070.92.002',46500,3,2),(30,'RENEW01_2070.92.001','Ayrshire','PV','Eastern Standard Time','RENEW01_2070.92.001',19800,3,2),(31,'RENEW01_2070.03.015','Logan’s Gap','WIND','Central Standard Time','RENEW01_2070.03.015',200100,2,2),(32,'RENEW01_2070.92.007','Boaz','PV','Eastern Standard Time','RENEW01_2070.92.007',4924,3,2),(33,'RENEW01_2070.92.008','Cline','PV','Eastern Standard Time','RENEW01_2070.92.008',5000,3,2),(34,'RENEW01_2070.92.009','Haywood Farm','PV','Eastern Standard Time','RENEW01_2070.92.009',4924,3,2),(35,'RENEW01_2070.92.010','Hood Farm','PV','Eastern Standard Time','RENEW01_2070.92.010',4950,3,2),(36,'RENEW01_2070.92.011','Innovative Solar 35','PV','Eastern Standard Time','RENEW01_2070.92.011',2000,3,2),(37,'RENEW01_2070.92.012','Innovative Solar 59','PV','Eastern Standard Time','RENEW01_2070.92.012',2000,3,2),(38,'RENEW01_2070.92.013','Innovative Solar 60','PV','Eastern Standard Time','RENEW01_2070.92.013',2000,3,2),(39,'RENEW01_2070.92.014','Moore','PV','Eastern Standard Time','RENEW01_2070.92.014',5000,3,2),(40,'RENEW01_2070.92.015','St. Pauls 2','PV','Eastern Standard Time','RENEW01_2070.92.015',4950,3,2),(41,'RENEW01_2070.92.016','Summer Wheat (San Joaquin)','PV','Pacific Standard Time','RENEW01_2070.92.016',18500,3,2),(42,'RENEW01_2070.92.017','Winter Wheat (San Joaquin)','PV','Pacific Standard Time','RENEW01_2070.92.017',1500,3,2),(43,'RENEW01_2070.92.018','ZV Solar 2','PV','Eastern Standard Time','RENEW01_2070.92.018',4950,3,2),(44,'RENEW01_2070.93.001','American Falls 1','PV','US Mountain Standard Time','RENEW01_2070.93.001',20000,4,2),(45,'RENEW01_2070.94.013','RPU','PV','Pacific Standard Time','RENEW01_2070.94.013',7500,5,2),(46,'RENEW01_2070.95.001','Springbok III','PV','Pacific Standard Time','RENEW01_2070.95.001',103275,6,2);
/*!40000 ALTER TABLE `Asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssetRecommendationSchedule`
--

DROP TABLE IF EXISTS `AssetRecommendationSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `AssetRecommendationSchedule` (
  `AssetId` int NOT NULL,
  `ScheduleId` int NOT NULL,
  PRIMARY KEY (`AssetId`,`ScheduleId`),
  KEY `IX_AssetRecommendationSchedule_ScheduleId` (`ScheduleId`),
  CONSTRAINT `FK_AssetRecommendationSchedule_Asset_AssetId` FOREIGN KEY (`AssetId`) REFERENCES `Asset` (`AssetId`) ON DELETE CASCADE,
  CONSTRAINT `FK_AssetRecommendationSchedule_RecommendationSchedule_ScheduleId` FOREIGN KEY (`ScheduleId`) REFERENCES `RecommendationSchedule` (`RecommendationScheduleId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssetRecommendationSchedule`
--

LOCK TABLES `AssetRecommendationSchedule` WRITE;
/*!40000 ALTER TABLE `AssetRecommendationSchedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssetRecommendationSchedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssetType`
--

DROP TABLE IF EXISTS `AssetType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `AssetType` (
  `AssetTypeId` int NOT NULL AUTO_INCREMENT,
  `Name` longtext,
  `DisplayText` longtext,
  `EnergyType` longtext,
  PRIMARY KEY (`AssetTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssetType`
--

LOCK TABLES `AssetType` WRITE;
/*!40000 ALTER TABLE `AssetType` DISABLE KEYS */;
INSERT INTO `AssetType` VALUES (1,'Portfolio','Portfolio',NULL),(2,'Plant','Plant',NULL);
/*!40000 ALTER TABLE `AssetType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecommendationJob`
--

DROP TABLE IF EXISTS `RecommendationJob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RecommendationJob` (
  `RecommendationJobId` int NOT NULL AUTO_INCREMENT,
  `Status` longtext,
  `TriggeredBy` longtext,
  `JobDuration` int DEFAULT NULL,
  `Timestamp` datetime NOT NULL,
  `AssetId` int DEFAULT NULL,
  `ScheduleRecommendationScheduleId` int DEFAULT NULL,
  PRIMARY KEY (`RecommendationJobId`),
  KEY `IX_RecommendationJob_AssetId` (`AssetId`),
  KEY `IX_RecommendationJob_ScheduleRecommendationScheduleId` (`ScheduleRecommendationScheduleId`),
  CONSTRAINT `FK_RecommendationJob_Asset_AssetId` FOREIGN KEY (`AssetId`) REFERENCES `Asset` (`AssetId`) ON DELETE RESTRICT,
  CONSTRAINT `FK_RecommendationJob_RecommendationSchedule_ScheduleRecommendat~` FOREIGN KEY (`ScheduleRecommendationScheduleId`) REFERENCES `RecommendationSchedule` (`RecommendationScheduleId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecommendationJob`
--

LOCK TABLES `RecommendationJob` WRITE;
/*!40000 ALTER TABLE `RecommendationJob` DISABLE KEYS */;
ALTER TABLE `RecommendationJob` AUTO_INCREMENT=1;
/*!40000 ALTER TABLE `RecommendationJob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecommendationJobLog`
--

DROP TABLE IF EXISTS `RecommendationJobLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RecommendationJobLog` (
  `RecommendationJobLogId` int NOT NULL AUTO_INCREMENT,
  `Description` longtext,
  `Time` datetime NOT NULL,
  `Level` longtext,
  `RecommendationJobId` int DEFAULT NULL,
  PRIMARY KEY (`RecommendationJobLogId`),
  KEY `IX_RecommendationJobLog_RecommendationJobId` (`RecommendationJobId`),
  CONSTRAINT `FK_RecommendationJobLog_RecommendationJob_RecommendationJobId` FOREIGN KEY (`RecommendationJobId`) REFERENCES `RecommendationJob` (`RecommendationJobId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=576 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecommendationJobLog`
--

LOCK TABLES `RecommendationJobLog` WRITE;
/*!40000 ALTER TABLE `RecommendationJobLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `RecommendationJobLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecommendationJobResult`
--

DROP TABLE IF EXISTS `RecommendationJobResult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RecommendationJobResult` (
  `RecommendationJobResultId` int NOT NULL,
  `DisplayText` longtext,
  `Result` longtext,
  `CostOfInaction` double NOT NULL,
  `ConfidencePercentage` double NOT NULL,
  `AssetId` int DEFAULT NULL,
  `Benefit` double NOT NULL DEFAULT '0',
  `CostOfAction` double NOT NULL DEFAULT '0',
  `NetSaving` double NOT NULL DEFAULT '0',
  `ReturnOnInvestment` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`RecommendationJobResultId`),
  KEY `IX_RecommendationJobResult_AssetId` (`AssetId`),
  CONSTRAINT `FK_RecommendationJobResult_Asset_AssetId` FOREIGN KEY (`AssetId`) REFERENCES `Asset` (`AssetId`) ON DELETE RESTRICT,
  CONSTRAINT `FK_RecommendationJobResult_RecommendationJob_RecommendationJobR~` FOREIGN KEY (`RecommendationJobResultId`) REFERENCES `RecommendationJob` (`RecommendationJobId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecommendationJobResult`
--

LOCK TABLES `RecommendationJobResult` WRITE;
/*!40000 ALTER TABLE `RecommendationJobResult` DISABLE KEYS */;
/*!40000 ALTER TABLE `RecommendationJobResult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecommendationParameter`
--

DROP TABLE IF EXISTS `RecommendationParameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RecommendationParameter` (
  `RecommendationParameterId` int NOT NULL AUTO_INCREMENT,
  `Name` longtext,
  `DisplayText` longtext,
  `DefaultValue` double NOT NULL,
  `ForRecommendationTypeRecommendationTypeId` int DEFAULT NULL,
  PRIMARY KEY (`RecommendationParameterId`),
  KEY `IX_RecommendationParameter_ForRecommendationTypeRecommendationT~` (`ForRecommendationTypeRecommendationTypeId`),
  CONSTRAINT `FK_RecommendationParameter_RecommendationType_ForRecommendation~` FOREIGN KEY (`ForRecommendationTypeRecommendationTypeId`) REFERENCES `RecommendationType` (`RecommendationTypeId`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecommendationParameter`
--

LOCK TABLES `RecommendationParameter` WRITE;
/*!40000 ALTER TABLE `RecommendationParameter` DISABLE KEYS */;
INSERT INTO `RecommendationParameter` VALUES (1,'SpanIncrement','Span Increment',1,1),(2,'CenterPointIncrement','Center Point Increment',1,1),(5,'Accelerator','Accelerator',0.25,1),(6,'SoilingSeasonBuffer','Soiling Season Buffer',10,1);
/*!40000 ALTER TABLE `RecommendationParameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecommendationSchedule`
--

DROP TABLE IF EXISTS `RecommendationSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RecommendationSchedule` (
  `RecommendationScheduleId` int NOT NULL AUTO_INCREMENT,
  `ModifiedBy` longtext,
  `Name` longtext,
  `DisplayText` longtext,
  `Granularity` longtext,
  `Description` longtext,
  `CreatedOn` datetime NOT NULL,
  `RecommendationTypeId` int DEFAULT NULL,
  `RecurrenceDatetime` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
  `RecurrenceDayOfWeek` int NOT NULL DEFAULT '0',
  `PreferedScenario` longtext,
  PRIMARY KEY (`RecommendationScheduleId`),
  KEY `IX_RecommendationSchedule_RecommendationTypeId` (`RecommendationTypeId`),
  CONSTRAINT `FK_RecommendationSchedule_RecommendationType_RecommendationType~` FOREIGN KEY (`RecommendationTypeId`) REFERENCES `RecommendationType` (`RecommendationTypeId`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecommendationSchedule`
--

LOCK TABLES `RecommendationSchedule` WRITE;
/*!40000 ALTER TABLE `RecommendationSchedule` DISABLE KEYS */;
ALTER TABLE `RecommendationSchedule` AUTO_INCREMENT=1;
/*!40000 ALTER TABLE `RecommendationSchedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecommendationScheduleParameter`
--

DROP TABLE IF EXISTS `RecommendationScheduleParameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RecommendationScheduleParameter` (
  `RecommendationScheduleParameterId` int NOT NULL AUTO_INCREMENT,
  `DisplayText` longtext,
  `ModifiedBy` longtext,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime NOT NULL,
  `ParamValue` double NOT NULL,
  `RecommendationParameterId` int DEFAULT NULL,
  `ScheduleRecommendationScheduleId` int DEFAULT NULL,
  PRIMARY KEY (`RecommendationScheduleParameterId`),
  KEY `IX_RecommendationScheduleParameter_RecommendationParameterId` (`RecommendationParameterId`),
  KEY `IX_RecommendationScheduleParameter_ScheduleRecommendationSchedu~` (`ScheduleRecommendationScheduleId`),
  CONSTRAINT `FK_RecommendationScheduleParameter_RecommendationParameter_Reco~` FOREIGN KEY (`RecommendationParameterId`) REFERENCES `RecommendationParameter` (`RecommendationParameterId`) ON DELETE RESTRICT,
  CONSTRAINT `FK_RecommendationScheduleParameter_RecommendationSchedule_Sched~` FOREIGN KEY (`ScheduleRecommendationScheduleId`) REFERENCES `RecommendationSchedule` (`RecommendationScheduleId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecommendationScheduleParameter`
--

LOCK TABLES `RecommendationScheduleParameter` WRITE;
/*!40000 ALTER TABLE `RecommendationScheduleParameter` DISABLE KEYS */;
/*!40000 ALTER TABLE `RecommendationScheduleParameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecommendationType`
--

DROP TABLE IF EXISTS `RecommendationType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RecommendationType` (
  `RecommendationTypeId` int NOT NULL AUTO_INCREMENT,
  `Type` longtext,
  `DisplayText` longtext,
  `Description` longtext,
  `EnergyType` longtext,
  PRIMARY KEY (`RecommendationTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecommendationType`
--

LOCK TABLES `RecommendationType` WRITE;
/*!40000 ALTER TABLE `RecommendationType` DISABLE KEYS */;
INSERT INTO `RecommendationType` VALUES (1,'Yearly Wash Optimization','Yearly Wash Optimization','This recommendation is used to suggest the optimal time to wash your solar panels. The algorithm takes in consideration:  dates  of soiling seasons, the rate of soiling, the energy price, predicated energy, cost of cleaning and more.','pv'),(2,'Adjusted Wash Optimization','Adjusted Wash Optimization','This recommendation allows you to create a more accurate schedule for the washing of your solar panels.',NULL),(3,'Gearbox Replacement Algorithm','Gearbox Replacement','This recommendation will suggest the ideal to replace the gearbox hardware.',NULL),(4,'Fuse Replacement Algorithm','Fuse Replacement','This recommendation will output the most favorable occasion to replace the fuse kit.',NULL),(5,'Panel Angle Algorithm','Panel Angle','This recommendation suggests the best moment when to adjust the angles of the solar panels.',NULL),(6,'Other Algorithm','Other','Another description of another template.',NULL);
/*!40000 ALTER TABLE `RecommendationType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WorkOrder`
--

DROP TABLE IF EXISTS `WorkOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `WorkOrder` (
  `WorkOrderId` int NOT NULL AUTO_INCREMENT,
  `DisplayText` longtext,
  `CostOfWork` double NOT NULL,
  `Time` datetime NOT NULL,
  `Protocol` longtext,
  PRIMARY KEY (`WorkOrderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WorkOrder`
--

LOCK TABLES `WorkOrder` WRITE;
/*!40000 ALTER TABLE `WorkOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `WorkOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__EFMigrationsHistory`
--

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(95) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__EFMigrationsHistory`
--

LOCK TABLES `__EFMigrationsHistory` WRITE;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` VALUES ('20201018094325_InitialCreate','3.1.9'),('20201102234403_Add a recommendation updates','3.1.9'),('20201107000414_Update job log model','3.1.9'),('20201120061814_Add cascading to schedule','3.1.9'),('20201125070216_RE-179 changes','3.1.9'),('20201127223435_Recommendation Job Result Update','3.1.9'),('20201225000321_Add cascade-delete of weak entites','3.1.9');
/*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-16 20:05:03
