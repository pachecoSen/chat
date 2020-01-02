-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: chat
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `clave` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `email` char(128) COLLATE utf8mb4_general_ci NOT NULL,
  `password` char(128) COLLATE utf8mb4_general_ci NOT NULL,
  `f_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `f_modifica` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `f_ultimo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `intentos` int(11) NOT NULL DEFAULT '0',
  `bloqueo` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`clave`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (3,'Jose Ignacio','Pacheco Cruz','e9b8e7180e11940dfe75953d730ddeb948b10e0e000da76c08af8149568c155bd98b2a5dbb1a21db5a6622804e0e809a9b87e2a92b91851bc58647794f4bef44','3e181adf07facec554d18f62196fdee70195d311741e512ce01fc0e5dc6a20984e0cecb61dd75b0883dcc70745a2574792aa6ff902dba7d4b70a0681c9ad4322','2020-01-02 23:34:03','2020-01-02 23:34:03','2020-01-02 23:34:03',0,0);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyadmin`
--

DROP TABLE IF EXISTS `keyadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keyadmin` (
  `admin` int(11) NOT NULL,
  `private` text COLLATE utf8mb4_general_ci NOT NULL,
  `public` text COLLATE utf8mb4_general_ci NOT NULL,
  UNIQUE KEY `admin_UNIQUE` (`admin`),
  KEY `fk_admin_key_idx` (`admin`),
  CONSTRAINT `fk_admin_key` FOREIGN KEY (`admin`) REFERENCES `admin` (`clave`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyadmin`
--

LOCK TABLES `keyadmin` WRITE;
/*!40000 ALTER TABLE `keyadmin` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'chat'
--

--
-- Dumping routines for database 'chat'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_new_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user_Chat`@`localhost` PROCEDURE `sp_new_admin`(
	in v_nombre varchar(60),
    in v_apellido varchar(80),
    in c_email char(255),
    in c_password char(255),
    in t_private text,
    in t_public text
)
BEGIN
	declare e_c_email, e_c_password char(128);
    declare i_clave int;
    select SHA2(c_email, 512) into e_c_email;
    select SHA2(c_password, 512) into e_c_password;
	insert into admin(nombre, apellido, email, password) values(v_nombre, v_apellido, e_c_email, e_c_password);
    select clave into i_clave from admin where email = e_c_email;
    insert into keyAdmin values (i_clave, t_private, t_public);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-02 17:38:00
