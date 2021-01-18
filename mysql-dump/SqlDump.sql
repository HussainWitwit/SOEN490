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
INSERT INTO `Action` VALUES (1,'ywo44','wash day','2020-09-18 00:00:00',44,NULL,15),(2,'ywo44','wash day','2020-09-18 00:00:00',44,NULL,16),(3,'ywo44','wash day','2020-09-18 00:00:00',44,NULL,17),(13,'ywo44','wash day','2020-09-18 00:00:00',44,NULL,27),(19,'ywo44','wash day','2020-09-20 00:00:00',44,NULL,139),(21,'ywo44','wash day','2020-09-21 00:00:00',44,NULL,177),(22,'ywo44','wash day','2020-09-21 00:00:00',44,NULL,178),(23,'ywo44','wash day','2020-09-21 00:00:00',44,NULL,179);
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
INSERT INTO `AssetRecommendationSchedule` VALUES (44,1),(20,67),(21,67),(22,67),(16,68),(17,68),(18,68),(24,69),(16,70),(18,70),(19,70),(25,71),(26,71),(27,71),(22,72),(15,75),(7,76),(8,77),(8,78),(12,79),(8,80),(10,81),(22,82),(37,83),(44,84),(44,85),(44,86),(44,87),(44,88),(44,89),(44,90),(44,92),(44,93),(44,94),(44,95),(44,96),(44,97),(44,98),(44,99);
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
INSERT INTO `RecommendationJob` VALUES (12,'Failed','Scheduler',36,'2020-11-29 14:13:04',44,1),(13,'Success','Scheduler',27,'2020-11-29 14:20:01',44,1),(14,'Running','Scheduler',0,'2020-11-29 14:21:30',44,1),(15,'Success','Scheduler',6,'2020-11-29 14:56:01',44,1),(16,'Success','Scheduler',5,'2020-11-29 14:56:09',44,1),(17,'Success','Scheduler',4,'2020-11-29 14:56:14',44,1),(18,'Success','Scheduler',3,'2020-11-29 14:56:20',44,1),(19,'Success','Scheduler',3,'2020-11-29 14:56:24',44,1),(20,'Success','Scheduler',3,'2020-11-29 14:56:29',44,1),(21,'Success','Scheduler',3,'2020-11-29 14:56:33',44,1),(22,'Success','Scheduler',3,'2020-11-29 14:56:37',44,1),(23,'Success','Scheduler',3,'2020-11-29 14:56:42',44,1),(24,'Success','Scheduler',3,'2020-11-29 14:56:46',44,1),(25,'Success','Scheduler',5,'2020-11-29 14:56:51',44,1),(26,'Success','Scheduler',4,'2020-11-29 14:56:57',44,1),(27,'Success','Scheduler',3,'2020-11-29 14:57:02',44,1),(132,'Failed','Scheduler',3,'2020-11-29 22:30:06',44,1),(133,'Failed','Scheduler',1,'2020-11-29 22:30:10',44,1),(134,'Success','Scheduler',6,'2020-11-29 22:30:10',44,1),(135,'Failed','Scheduler',3,'2020-11-29 22:30:10',44,1),(136,'Failed','Scheduler',2,'2020-11-29 22:30:13',44,1),(137,'Failed','Scheduler',2,'2020-11-29 22:30:15',44,1),(138,'Failed','Scheduler',2,'2020-11-29 22:30:17',44,1),(139,'Success','Scheduler',5,'2020-11-29 22:30:18',44,1),(140,'Failed','Scheduler',2,'2020-11-29 22:30:18',44,1),(141,'Failed','Scheduler',2,'2020-11-29 22:30:20',44,1),(142,'Failed','Scheduler',2,'2020-11-29 22:30:22',44,1),(143,'Failed','Scheduler',2,'2020-11-29 22:30:24',44,1),(144,'Running','Scheduler',0,'2020-11-29 22:30:24',44,1),(157,'Failed','Scheduler',2,'2020-11-29 22:30:56',44,1),(158,'Failed','Scheduler',7,'2020-11-29 22:30:56',44,1),(174,'Running','Scheduler',0,'2021-01-15 10:50:38',44,90),(176,'Failed','Scheduler',2,'2021-01-15 12:16:25',44,94),(177,'Success','Scheduler',10,'2021-01-15 12:23:26',44,95),(178,'Success','Scheduler',17,'2021-01-15 12:32:39',44,97),(179,'Success','Scheduler',7,'2021-01-15 12:55:39',44,99);
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
INSERT INTO `RecommendationJobLog` VALUES (25,'Job started!','2020-11-20 21:43:02','Information',13),(26,'Job finished!','2020-11-20 21:43:07','Information',13),(27,'Job started!','2020-11-20 21:44:01','Information',14),(28,'Job finished!','2020-11-20 21:44:07','Information',14),(29,'Job started!','2020-11-20 22:03:04','Information',15),(30,'Job finished!','2020-11-20 22:03:10','Information',15),(31,'Starting Yearly Wash Optimization Recommendation','2020-11-27 23:51:34','Information',16),(32,'Looking for best cleaning dates...','2020-11-27 23:51:35','Information',16),(33,'Starting Yearly Wash Optimization Recommendation','2020-11-27 23:54:38','Information',17),(34,'Looking for best cleaning dates...','2020-11-27 23:54:40','Information',17),(35,'Starting Yearly Wash Optimization Recommendation','2020-11-27 23:57:02','Information',18),(36,'Looking for best cleaning dates...','2020-11-27 23:57:18','Information',18),(37,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:00:53','Information',19),(38,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:05:07','Information',20),(39,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:25:14','Information',21),(40,'Looking for best cleaning dates...','2020-11-28 00:25:44','Information',21),(41,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:27:11','Information',22),(42,'Looking for best cleaning dates...','2020-11-28 00:28:19','Information',22),(43,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:31:44','Information',23),(44,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:34:31','Information',24),(45,'Looking for best cleaning dates...','2020-11-28 00:36:45','Information',24),(46,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:44:00','Information',25),(47,'Looking for best cleaning dates...','2020-11-28 00:44:03','Information',25),(48,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:47:12','Information',26),(49,'Looking for best cleaning dates...','2020-11-28 00:47:36','Information',26),(50,'Starting Yearly Wash Optimization Recommendation','2020-11-28 00:54:30','Information',27),(51,'Looking for best cleaning dates...','2020-11-28 00:54:31','Information',27),(270,'Job started!','2020-11-29 05:20:01','Information',133),(271,'Job started!','2020-11-29 05:22:01','Information',134),(299,'Job started!','2020-11-29 14:13:04','Information',12),(300,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:13:18','Information',12),(301,'Job started!','2020-11-29 14:20:01','Information',13),(302,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:20:32','Information',13),(303,'Looking for best cleaning dates...','2020-11-29 14:20:32','Information',13),(304,'Best combination found!','2020-11-29 14:20:32','Information',13),(305,'Job finished!','2020-11-29 14:21:29','Information',13),(306,'Job started!','2020-11-29 14:21:30','Information',14),(307,'Job started!','2020-11-29 14:56:02','Information',15),(308,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:07','Information',15),(309,'Looking for best cleaning dates...','2020-11-29 14:56:07','Information',15),(310,'Best combination found!','2020-11-29 14:56:07','Information',15),(311,'Job finished!','2020-11-29 14:56:08','Information',15),(312,'Job started!','2020-11-29 14:56:09','Information',16),(313,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:12','Information',16),(314,'Looking for best cleaning dates...','2020-11-29 14:56:12','Information',16),(315,'Best combination found!','2020-11-29 14:56:13','Information',16),(316,'Job finished!','2020-11-29 14:56:14','Information',16),(317,'Job started!','2020-11-29 14:56:15','Information',17),(318,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:18','Information',17),(319,'Looking for best cleaning dates...','2020-11-29 14:56:18','Information',17),(320,'Best combination found!','2020-11-29 14:56:18','Information',17),(321,'Job finished!','2020-11-29 14:56:19','Information',17),(322,'Job started!','2020-11-29 14:56:20','Information',18),(323,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:22','Information',18),(324,'Looking for best cleaning dates...','2020-11-29 14:56:23','Information',18),(325,'Best combination found!','2020-11-29 14:56:23','Information',18),(326,'Job finished!','2020-11-29 14:56:24','Information',18),(327,'Job started!','2020-11-29 14:56:25','Information',19),(328,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:27','Information',19),(329,'Looking for best cleaning dates...','2020-11-29 14:56:27','Information',19),(330,'Best combination found!','2020-11-29 14:56:27','Information',19),(331,'Job finished!','2020-11-29 14:56:28','Information',19),(332,'Job started!','2020-11-29 14:56:29','Information',20),(333,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:31','Information',20),(334,'Looking for best cleaning dates...','2020-11-29 14:56:31','Information',20),(335,'Best combination found!','2020-11-29 14:56:31','Information',20),(336,'Job finished!','2020-11-29 14:56:32','Information',20),(337,'Job started!','2020-11-29 14:56:33','Information',21),(338,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:35','Information',21),(339,'Looking for best cleaning dates...','2020-11-29 14:56:35','Information',21),(340,'Best combination found!','2020-11-29 14:56:36','Information',21),(341,'Job finished!','2020-11-29 14:56:36','Information',21),(342,'Job started!','2020-11-29 14:56:38','Information',22),(343,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:40','Information',22),(344,'Looking for best cleaning dates...','2020-11-29 14:56:40','Information',22),(345,'Best combination found!','2020-11-29 14:56:40','Information',22),(346,'Job finished!','2020-11-29 14:56:41','Information',22),(347,'Job started!','2020-11-29 14:56:42','Information',23),(348,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:44','Information',23),(349,'Looking for best cleaning dates...','2020-11-29 14:56:45','Information',23),(350,'Best combination found!','2020-11-29 14:56:45','Information',23),(351,'Job finished!','2020-11-29 14:56:46','Information',23),(352,'Job started!','2020-11-29 14:56:47','Information',24),(353,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:49','Information',24),(354,'Looking for best cleaning dates...','2020-11-29 14:56:49','Information',24),(355,'Best combination found!','2020-11-29 14:56:50','Information',24),(356,'Job finished!','2020-11-29 14:56:50','Information',24),(357,'Job started!','2020-11-29 14:56:51','Information',25),(358,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:56:55','Information',25),(359,'Looking for best cleaning dates...','2020-11-29 14:56:55','Information',25),(360,'Best combination found!','2020-11-29 14:56:55','Information',25),(361,'Job finished!','2020-11-29 14:56:56','Information',25),(362,'Job started!','2020-11-29 14:56:57','Information',26),(363,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:57:00','Information',26),(364,'Looking for best cleaning dates...','2020-11-29 14:57:00','Information',26),(365,'Best combination found!','2020-11-29 14:57:00','Information',26),(366,'Job finished!','2020-11-29 14:57:01','Information',26),(367,'Job started!','2020-11-29 14:57:02','Information',27),(368,'Starting Yearly Wash Optimization Recommendation','2020-11-29 14:57:04','Information',27),(369,'Looking for best cleaning dates...','2020-11-29 14:57:05','Information',27),(370,'Best combination found!','2020-11-29 14:57:05','Information',27),(371,'Job finished!','2020-11-29 14:57:06','Information',27),(494,'Job started!','2020-11-29 22:30:07','Information',132),(499,'Job started!','2020-11-29 22:30:10','Information',133),(500,'Job started!','2020-11-29 22:30:11','Information',134),(501,'Job started!','2020-11-29 22:30:11','Information',135),(502,'Job started!','2020-11-29 22:30:14','Information',136),(503,'Starting Yearly Wash Optimization Recommendation','2020-11-29 22:30:16','Information',134),(504,'Looking for best cleaning dates...','2020-11-29 22:30:16','Information',134),(505,'Job started!','2020-11-29 22:30:15','Information',137),(506,'Best combination found!','2020-11-29 22:30:16','Information',134),(507,'Job finished!','2020-11-29 22:30:17','Information',134),(508,'Job started!','2020-11-29 22:30:17','Information',138),(509,'Job started!','2020-11-29 22:30:18','Information',139),(510,'Job started!','2020-11-29 22:30:19','Information',140),(511,'Job started!','2020-11-29 22:30:21','Information',141),(512,'Starting Yearly Wash Optimization Recommendation','2020-11-29 22:30:21','Information',139),(513,'Looking for best cleaning dates...','2020-11-29 22:30:22','Information',139),(514,'Best combination found!','2020-11-29 22:30:22','Information',139),(515,'Job finished!','2020-11-29 22:30:23','Information',139),(516,'Job started!','2020-11-29 22:30:23','Information',142),(517,'Job started!','2020-11-29 22:30:24','Information',143),(518,'Job started!','2020-11-29 22:30:24','Information',144),(521,'Starting Yearly Wash Optimization Recommendation','2020-11-29 22:30:28','Information',144),(532,'Job started!','2020-11-29 22:30:56','Information',157),(533,'Job started!','2020-11-29 22:30:57','Information',158),(549,'Job started!','2021-01-15 10:50:38','Information',174),(555,'Job started!','2021-01-15 12:16:25','Information',176),(556,'Job started!','2021-01-15 12:23:27','Information',177),(557,'Starting Yearly Wash Optimization Recommendation','2021-01-15 12:23:35','Information',177),(558,'Looking for best cleaning dates...','2021-01-15 12:23:36','Information',177),(559,'Best combination found!','2021-01-15 12:23:36','Information',177),(560,'Job finished!','2021-01-15 12:23:37','Information',177),(561,'Job started!','2021-01-15 12:32:39','Information',178),(562,'Starting Yearly Wash Optimization Recommendation','2021-01-15 12:32:55','Information',178),(563,'Looking for best cleaning dates...','2021-01-15 12:32:55','Information',178),(564,'Best combination found!','2021-01-15 12:32:56','Information',178),(565,'Job finished!','2021-01-15 12:32:56','Information',178),(566,'Job started!','2021-01-15 12:55:39','Information',179),(567,'Starting Yearly Wash Optimization Recommendation','2021-01-15 12:55:45','Information',179),(568,'Looking for best cleaning dates...','2021-01-15 12:55:45','Information',179),(569,'Best combination found!','2021-01-15 12:55:46','Information',179),(570,'Job finished!','2021-01-15 12:55:46','Information',179);
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
INSERT INTO `RecommendationJobResult` VALUES (15,NULL,NULL,3931.7715579516057,0,44,1514.2991846770751,53.3568,1460.942384677075,2838.062223891004),(16,NULL,NULL,3931.7715579516057,0,44,1514.2991846770751,53.3568,1460.942384677075,2838.062223891004),(17,NULL,NULL,3931.7715579516057,0,44,1514.2991846770751,53.3568,1460.942384677075,2838.062223891004),(27,NULL,NULL,3931.7715579516057,0,44,1514.2991846770751,53.3568,1460.942384677075,2838.062223891004),(139,NULL,NULL,4832.480938804579,0,44,1815.5077240280798,53.3568,1762.1509240280798,3402.579847419785),(177,NULL,NULL,4832.480938804579,0,44,1799.4686254078342,53.3568,1746.1118254078342,3372.519763943554),(178,NULL,NULL,4832.480938804579,0,44,1799.4686254078342,53.3568,1746.1118254078342,3372.519763943554),(179,NULL,NULL,4832.480938804579,0,44,1799.4686254078342,53.3568,1746.1118254078342,3372.519763943554);
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
INSERT INTO `RecommendationSchedule` VALUES (67,'Kenzo','Rec23','Yearly Wash Optimization','Yearly',NULL,'2021-01-06 10:32:20',1,'2021-01-06 10:31:37',1,'netSaving'),(68,'Kenzo','search test','Yearly Wash Optimization','Yearly',NULL,'2021-01-13 15:07:43',1,'2021-01-13 15:01:48',1,'netSaving'),(69,'Kenzo','Test 1','Yearly Wash Optimization','Yearly',NULL,'2021-01-13 17:30:56',1,'2021-01-13 17:30:49',1,'ROI'),(70,'Kenzo','test redux small refactor','Yearly Wash Optimization','Yearly',NULL,'2021-01-14 00:02:07',1,'2021-01-14 00:00:50',1,'netSaving'),(71,'Kenzo','second redux refactor test','Yearly Wash Optimization','Yearly',NULL,'2021-01-14 00:47:34',1,'2021-01-14 00:42:10',1,'netSaving'),(72,'Kenzo','third ','Yearly Wash Optimization','Yearly',NULL,'2021-01-14 00:49:54',1,'2021-01-14 00:48:57',1,'ROI'),(75,'Kenzo','testAlgo2','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 01:29:16',1,'2021-01-15 20:34:22',1,'ROI'),(76,'Kenzo','AlgoDemo','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 01:39:50',1,'2021-01-14 20:42:59',1,'ROI'),(77,'Kenzo','confirmation test','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 02:10:14',1,'2021-01-29 02:07:00',1,'ROI'),(78,'Kenzo','abc','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 05:34:29',1,'2021-01-15 05:34:00',1,'ROI'),(79,'Kenzo','param','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 05:41:16',1,'2021-01-15 00:48:02',1,'ROI'),(80,'Kenzo','qwerty','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 05:53:24',1,'2021-01-15 01:06:18',1,'ROI'),(81,'Kenzo','fr','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 06:08:55',1,'2021-01-15 01:11:14',1,'ROI'),(82,'Kenzo','zooooo','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:13:06',1,'2021-01-15 10:16:53',1,'ROI'),(83,'Kenzo','debug','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:19:59',1,'2021-01-15 10:21:20',1,'ROI'),(84,'Kenzo','wash opt','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:25:50',1,'2021-01-15 10:27:12',1,'ROI'),(85,'Kenzo','one more test','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:28:53',1,'2021-01-15 10:29:12',1,'ROI'),(86,'Kenzo','TEST','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:31:38',1,'2021-01-15 10:33:12',1,'ROI'),(87,'Kenzo','ttttttest','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:35:29',1,'2021-01-15 10:36:12',1,'netSaving'),(88,'Kenzo','no','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:39:25',1,'2021-01-15 10:40:12',1,'ROI'),(89,'Kenzo','american falls 1 wash','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:42:06',1,'2021-01-15 10:43:12',1,'ROI'),(90,'Kenzo','AF1 ywo','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 15:49:12',1,'2021-01-15 10:50:32',1,'ROI'),(92,'Kenzo','time test','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 16:36:55',1,'2021-01-15 16:38:14',1,'ROI'),(93,'Kenzo','ywo6','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 16:41:05',1,'2021-01-15 16:42:33',1,'ROI'),(94,'Kenzo','algoDemo','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 17:15:17',1,'2021-01-15 12:16:26',1,'ROI'),(95,'Kenzo','TestYWO','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 17:22:16',1,'2021-01-15 12:23:26',1,'ROI'),(96,'Kenzo','okokok','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 17:25:31',1,'2021-01-15 12:27:26',1,'ROI'),(97,'Kenzo','finalTest','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 17:31:24',1,'2021-01-15 12:32:39',1,'ROI'),(98,'Kenzo','final','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 17:50:31',1,'2021-01-16 00:51:39',1,'ROI'),(99,'Kenzo','final2','Yearly Wash Optimization','Yearly',NULL,'2021-01-15 17:54:10',1,'2021-01-15 12:55:39',1,'ROI');
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
INSERT INTO `RecommendationScheduleParameter` VALUES (67,'SpanIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,1,92),(68,'CenterPointIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,2,92),(69,'Accelerator','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',0.35,5,92),(70,'SoilingSeasonBuffer','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,6,92),(71,'SpanIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,1,93),(72,'CenterPointIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,2,93),(73,'Accelerator','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',0.35,5,93),(74,'SoilingSeasonBuffer','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,6,93),(75,'SpanIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,1,94),(76,'CenterPointIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,2,94),(77,'Accelerator','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',0.35,5,94),(78,'SoilingSeasonBuffer','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,6,94),(79,'SpanIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,1,95),(80,'CenterPointIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,2,95),(81,'Accelerator','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',0.35,5,95),(82,'SoilingSeasonBuffer','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,6,95),(83,'SpanIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,1,96),(84,'CenterPointIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,2,96),(85,'Accelerator','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',0.35,5,96),(86,'SoilingSeasonBuffer','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,6,96),(87,'SpanIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,1,97),(88,'CenterPointIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,2,97),(89,'Accelerator','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',0.35,5,97),(90,'SoilingSeasonBuffer','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,6,97),(91,'SpanIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,1,98),(92,'CenterPointIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,2,98),(93,'Accelerator','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',0.35,5,98),(94,'SoilingSeasonBuffer','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,6,98),(95,'SpanIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,1,99),(96,'CenterPointIncrement','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,2,99),(97,'Accelerator','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',0.35,5,99),(98,'SoilingSeasonBuffer','Kenzo','0001-01-01 00:00:00','0001-01-01 00:00:00',3,6,99);
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
