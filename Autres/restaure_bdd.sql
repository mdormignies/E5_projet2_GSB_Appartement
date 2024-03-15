-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour test-angular
DROP DATABASE IF EXISTS `test-angular`;
CREATE DATABASE IF NOT EXISTS `test-angular` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test-angular`;

-- Listage de la structure de table test-angular. appartement
DROP TABLE IF EXISTS `appartement`;
CREATE TABLE IF NOT EXISTS `appartement` (
  `numappart` int NOT NULL AUTO_INCREMENT,
  `rue` varchar(50) DEFAULT NULL,
  `arrondisse` int NOT NULL,
  `etage` int DEFAULT NULL,
  `typappart` varchar(10) NOT NULL,
  `prix_loc` decimal(10,2) DEFAULT NULL,
  `prix_charg` decimal(10,2) DEFAULT NULL,
  `ascenseur` tinyint(1) DEFAULT NULL,
  `preavis` tinyint(1) DEFAULT NULL,
  `date_libre` date NOT NULL,
  `numeroprop` int NOT NULL,
  PRIMARY KEY (`numappart`),
  KEY `numeroprop` (`numeroprop`),
  CONSTRAINT `appartement_ibfk_1` FOREIGN KEY (`numeroprop`) REFERENCES `proprietaire` (`numeroprop`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.appartement : ~1 rows (environ)
DELETE FROM `appartement`;
INSERT INTO `appartement` (`numappart`, `rue`, `arrondisse`, `etage`, `typappart`, `prix_loc`, `prix_charg`, `ascenseur`, `preavis`, `date_libre`, `numeroprop`) VALUES
	(1, NULL, 1, NULL, 'T2', NULL, NULL, NULL, NULL, '2024-03-14', 1);

-- Listage de la structure de table test-angular. arrondissement
DROP TABLE IF EXISTS `arrondissement`;
CREATE TABLE IF NOT EXISTS `arrondissement` (
  `arrondiss_dem` int NOT NULL,
  PRIMARY KEY (`arrondiss_dem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.arrondissement : ~0 rows (environ)
DELETE FROM `arrondissement`;
INSERT INTO `arrondissement` (`arrondiss_dem`) VALUES
	(1);

-- Listage de la structure de table test-angular. client
DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `num_cli` int NOT NULL AUTO_INCREMENT,
  `mdp_cli` varchar(255) DEFAULT NULL,
  `nom_cli` varchar(30) NOT NULL,
  `prenom_cli` varchar(20) NOT NULL,
  `adresse_cli` varchar(50) NOT NULL,
  `codeville_cli` varchar(30) NOT NULL,
  `tel_cli` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`num_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.client : ~2 rows (environ)
DELETE FROM `client`;
INSERT INTO `client` (`num_cli`, `mdp_cli`, `nom_cli`, `prenom_cli`, `adresse_cli`, `codeville_cli`, `tel_cli`) VALUES
	(1, 'test', 'test', 'test', '1 avenue du test', '75001', '0601020304'),
	(2, 'password', 'Nom', 'Prenom', '5 Rue du quoi', '75009', '0123456789'),
	(9, 'a', 'Maxime', 'D', '80 Avenue de l\'amusement', '75006', '0626548452');

-- Listage de la structure de table test-angular. concerner
DROP TABLE IF EXISTS `concerner`;
CREATE TABLE IF NOT EXISTS `concerner` (
  `num_dem` int NOT NULL,
  `arrondiss_dem` int NOT NULL,
  PRIMARY KEY (`num_dem`,`arrondiss_dem`),
  KEY `arrondiss_dem` (`arrondiss_dem`),
  CONSTRAINT `concerner_ibfk_1` FOREIGN KEY (`num_dem`) REFERENCES `demande` (`num_dem`),
  CONSTRAINT `concerner_ibfk_2` FOREIGN KEY (`arrondiss_dem`) REFERENCES `arrondissement` (`arrondiss_dem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.concerner : ~0 rows (environ)
DELETE FROM `concerner`;

-- Listage de la structure de table test-angular. demande
DROP TABLE IF EXISTS `demande`;
CREATE TABLE IF NOT EXISTS `demande` (
  `num_dem` int NOT NULL AUTO_INCREMENT,
  `type_dem` varchar(10) NOT NULL,
  `date_limite` date DEFAULT NULL,
  `num_cli` int NOT NULL,
  PRIMARY KEY (`num_dem`),
  KEY `num_cli` (`num_cli`),
  CONSTRAINT `demande_ibfk_1` FOREIGN KEY (`num_cli`) REFERENCES `client` (`num_cli`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.demande : ~0 rows (environ)
DELETE FROM `demande`;

-- Listage de la structure de table test-angular. locataire
DROP TABLE IF EXISTS `locataire`;
CREATE TABLE IF NOT EXISTS `locataire` (
  `numeroloc` int NOT NULL AUTO_INCREMENT,
  `mdp_loc` varchar(255) DEFAULT NULL,
  `nom_loc` varchar(30) NOT NULL,
  `prenom_loc` varchar(20) NOT NULL,
  `datenaiss` date NOT NULL,
  `tel_loc` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `r_i_b` int NOT NULL,
  `tel_banque` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `numappart` int NOT NULL,
  PRIMARY KEY (`numeroloc`),
  UNIQUE KEY `numappart` (`numappart`),
  CONSTRAINT `locataire_ibfk_1` FOREIGN KEY (`numappart`) REFERENCES `appartement` (`numappart`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.locataire : ~1 rows (environ)
DELETE FROM `locataire`;
INSERT INTO `locataire` (`numeroloc`, `mdp_loc`, `nom_loc`, `prenom_loc`, `datenaiss`, `tel_loc`, `r_i_b`, `tel_banque`, `numappart`) VALUES
	(1, 'auguste', 'Luyedisa', 'Auguste', '2004-09-04', '0123456789', 123456789, '0987654321', 1);

-- Listage de la structure de table test-angular. persons
DROP TABLE IF EXISTS `persons`;
CREATE TABLE IF NOT EXISTS `persons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.persons : ~2 rows (environ)
DELETE FROM `persons`;
INSERT INTO `persons` (`id`, `name`, `age`) VALUES
	(1, 'Maxime', 18),
	(2, 'auguste', 21);

-- Listage de la structure de table test-angular. proprietaire
DROP TABLE IF EXISTS `proprietaire`;
CREATE TABLE IF NOT EXISTS `proprietaire` (
  `numeroprop` int NOT NULL AUTO_INCREMENT,
  `mdp_prop` varchar(255) DEFAULT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `code_ville` varchar(50) NOT NULL,
  `tel` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`numeroprop`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.proprietaire : ~0 rows (environ)
DELETE FROM `proprietaire`;
INSERT INTO `proprietaire` (`numeroprop`, `mdp_prop`, `nom`, `prenom`, `adresse`, `code_ville`, `tel`) VALUES
	(1, 'vasile', 'Vasile', 'Bugneac', '3 rue de quelque chose', '75003', '0645657585');

-- Listage de la structure de table test-angular. visiter
DROP TABLE IF EXISTS `visiter`;
CREATE TABLE IF NOT EXISTS `visiter` (
  `numappart` int NOT NULL,
  `num_cli` int NOT NULL,
  `date_visite` date DEFAULT NULL,
  PRIMARY KEY (`numappart`,`num_cli`),
  KEY `num_cli` (`num_cli`),
  CONSTRAINT `visiter_ibfk_1` FOREIGN KEY (`numappart`) REFERENCES `appartement` (`numappart`),
  CONSTRAINT `visiter_ibfk_2` FOREIGN KEY (`num_cli`) REFERENCES `client` (`num_cli`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.visiter : ~0 rows (environ)
DELETE FROM `visiter`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
