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
  CONSTRAINT `appartement_ibfk_1` FOREIGN KEY (`numeroprop`) REFERENCES `proprietaire` (`numeroprop`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.appartement : ~10 rows (environ)
DELETE FROM `appartement`;
INSERT INTO `appartement` (`numappart`, `rue`, `arrondisse`, `etage`, `typappart`, `prix_loc`, `prix_charg`, `ascenseur`, `preavis`, `date_libre`, `numeroprop`) VALUES
	(1, 'Rue de la République', 3, 17, 'T2', 8500.20, 20.20, 1, 1, '2024-03-30', 3),
	(12, 'Rue de la Paix', 1, 3, 'T2', 1200.00, 100.00, 1, 1, '2024-02-15', 6),
	(14, 'Boulevard Saint-Germain', 5, 2, 'T3', 1800.00, 150.00, 0, 1, '2024-02-28', 8),
	(15, 'Rue de Rivoli', 4, 4, 'Studio', 1300.00, 100.00, 0, 1, '2024-02-20', 7),
	(17, 'Rue du Faubourg Saint-Honoré', 8, 3, 'Studio', 1400.00, 120.00, 1, 1, '2024-02-18', 9),
	(18, 'Rue de la Pompe', 16, 7, 'T4', 2500.00, 200.00, 1, 1, '2024-03-05', 3),
	(19, 'Avenue Foch', 16, 1, 'T5', 3000.00, 250.00, 0, 1, '2024-03-10', 3),
	(21, 'Rue Saint-Antoine', 4, 3, 'Studio', 1350.00, 100.00, 1, 1, '2024-03-28', 6),
	(29, '68 Rue de la rue qui est à côté', 2, 5, 'T4', 9600.00, 400.00, 1, 1, '2024-06-30', 7),
	(30, '69 rue de Maxime', 5, 0, 'T4', 5222.00, -555.00, 1, 1, '2024-03-29', 7),
	(35, '84 Rue de turbigo', 3, 5, 'Studio', 8520.00, 200.00, 1, 1, '2024-03-31', 13);

-- Listage de la structure de table test-angular. client
DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `num_cli` int NOT NULL AUTO_INCREMENT,
  `email_cli` varchar(50) NOT NULL,
  `mdp_cli` varchar(255) DEFAULT NULL,
  `nom_cli` varchar(30) NOT NULL,
  `prenom_cli` varchar(20) NOT NULL,
  `adresse_cli` varchar(50) NOT NULL,
  `codeville_cli` varchar(30) NOT NULL,
  `tel_cli` varchar(20) NOT NULL,
  `role` enum('client','admin') NOT NULL DEFAULT 'client',
  PRIMARY KEY (`num_cli`),
  UNIQUE KEY `email_cli` (`email_cli`),
  UNIQUE KEY `tel_cli` (`tel_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.client : ~4 rows (environ)
DELETE FROM `client`;
INSERT INTO `client` (`num_cli`, `email_cli`, `mdp_cli`, `nom_cli`, `prenom_cli`, `adresse_cli`, `codeville_cli`, `tel_cli`, `role`) VALUES
	(1, 'test@test.test', 'test1234', 'test', 'test', '1 avenue des tests', '75001', '0601020304', 'client'),
	(2, 'nom.prenom@gmail.test', 'password', 'Nom', 'Prenom', '5 Rue du quoi', '75009', '0123456789', 'client'),
	(9, 'dmaxime@gmail.com', '12345678', 'Maxime', 'D', '80 Avenue de l\'amusement', '75006', '0626548452', 'client'),
	(10, 'vasile.bors@yahoo.info', 'vasile20', 'bors', 'vasile', 'Avenue trompignon', '75003', '0151236322', 'client');

-- Listage de la structure de table test-angular. demande
DROP TABLE IF EXISTS `demande`;
CREATE TABLE IF NOT EXISTS `demande` (
  `num_dem` int NOT NULL AUTO_INCREMENT,
  `statut_dem` varchar(30) NOT NULL,
  `numappart` int NOT NULL,
  `num_cli` int NOT NULL,
  `numeroprop` int NOT NULL,
  PRIMARY KEY (`num_dem`),
  KEY `num_cli` (`num_cli`),
  KEY `demande_ibfk_1` (`numappart`),
  KEY `demande_ibfk_3` (`numeroprop`),
  CONSTRAINT `demande_ibfk_1` FOREIGN KEY (`numappart`) REFERENCES `appartement` (`numappart`) ON DELETE CASCADE,
  CONSTRAINT `demande_ibfk_2` FOREIGN KEY (`num_cli`) REFERENCES `client` (`num_cli`) ON DELETE CASCADE,
  CONSTRAINT `demande_ibfk_3` FOREIGN KEY (`numeroprop`) REFERENCES `proprietaire` (`numeroprop`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.demande : ~0 rows (environ)
DELETE FROM `demande`;
INSERT INTO `demande` (`num_dem`, `statut_dem`, `numappart`, `num_cli`, `numeroprop`) VALUES
	(2, 'En cours', 12, 9, 6);

-- Listage de la structure de table test-angular. locataire
DROP TABLE IF EXISTS `locataire`;
CREATE TABLE IF NOT EXISTS `locataire` (
  `numeroloc` int NOT NULL AUTO_INCREMENT,
  `email_loc` varchar(50) NOT NULL,
  `mdp_loc` varchar(255) NOT NULL,
  `nom_loc` varchar(30) NOT NULL,
  `prenom_loc` varchar(20) NOT NULL,
  `datenaiss` date NOT NULL,
  `tel_loc` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `r_i_b` int NOT NULL,
  `tel_banque` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `numappart` int NOT NULL,
  PRIMARY KEY (`numeroloc`),
  UNIQUE KEY `email_loc` (`email_loc`),
  UNIQUE KEY `tel_loc` (`tel_loc`),
  UNIQUE KEY `numappart` (`numappart`),
  CONSTRAINT `locataire_ibfk_1` FOREIGN KEY (`numappart`) REFERENCES `appartement` (`numappart`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.locataire : ~2 rows (environ)
DELETE FROM `locataire`;
INSERT INTO `locataire` (`numeroloc`, `email_loc`, `mdp_loc`, `nom_loc`, `prenom_loc`, `datenaiss`, `tel_loc`, `r_i_b`, `tel_banque`, `numappart`) VALUES
	(1, 'auguste@turgot.fr', 'augusteL', 'Luyedisa', 'Auguste', '2004-09-04', '0123456789', 123456789, '0987654321', 1),
	(2, 'test@test.test', 'test1234', 'test', 'test', '1999-01-20', '0601020304', 784652256, '0121232625', 18),
	(15, 'dmaxime@gmail.com', '12345678', 'Maxime', 'D', '2009-03-05', '0626548452', 333444666, '0164845225', 30);

-- Listage de la structure de table test-angular. proprietaire
DROP TABLE IF EXISTS `proprietaire`;
CREATE TABLE IF NOT EXISTS `proprietaire` (
  `numeroprop` int NOT NULL AUTO_INCREMENT,
  `email_prop` varchar(50) NOT NULL,
  `mdp_prop` varchar(255) DEFAULT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `code_ville` varchar(50) NOT NULL,
  `tel` varchar(20) NOT NULL,
  PRIMARY KEY (`numeroprop`),
  UNIQUE KEY `email_prop` (`email_prop`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.proprietaire : ~5 rows (environ)
DELETE FROM `proprietaire`;
INSERT INTO `proprietaire` (`numeroprop`, `email_prop`, `mdp_prop`, `nom`, `prenom`, `adresse`, `code_ville`, `tel`) VALUES
	(3, 'jean.dupont@yahoo.com', 'mdp1jean', 'Jean', 'Dupont', '5 rue de la Paix', '75002', '0654321098'),
	(6, 'leclerc.sophie@turgot.fr', 'mdp4sophie', 'Sophie', 'Leclerc', '20 boulevard Haussmann', '75009', '0145678901'),
	(7, 'p.lefebvre@gmail.com', 'mdp5paul', 'Paul', 'Lefebvre', '25 rue de la République', '75004', '0678902345'),
	(8, 'i.girard@gmail.com', 'mdp6isabelle', 'Isabelle', 'Girard', '30 avenue Montaigne', '75008', '0156789012'),
	(9, 'bonnet.jacques@turgot.fr', 'mdp7jacques', 'Jacques', 'Bonnet', '35 rue du Faubourg Saint-Honoré', '75008', '0643210987'),
	(13, 'vhugo@gmail.com', '12345678', 'Hugo', 'Victor', '14 Rue des près', '89270', '0787988558');

-- Listage de la structure de table test-angular. visiter
DROP TABLE IF EXISTS `visiter`;
CREATE TABLE IF NOT EXISTS `visiter` (
  `numappart` int NOT NULL,
  `num_cli` int NOT NULL,
  `date_visite` date DEFAULT NULL,
  PRIMARY KEY (`numappart`,`num_cli`),
  KEY `num_cli` (`num_cli`),
  CONSTRAINT `visiter_ibfk_1` FOREIGN KEY (`numappart`) REFERENCES `appartement` (`numappart`),
  CONSTRAINT `visiter_ibfk_2` FOREIGN KEY (`num_cli`) REFERENCES `client` (`num_cli`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test-angular.visiter : ~0 rows (environ)
DELETE FROM `visiter`;
INSERT INTO `visiter` (`numappart`, `num_cli`, `date_visite`) VALUES
	(30, 1, '2024-03-30');

-- Listage de la structure de déclencheur test-angular. after_locataire_insert
DROP TRIGGER IF EXISTS `after_locataire_insert`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_locataire_insert` AFTER INSERT ON `locataire` FOR EACH ROW BEGIN
    DELETE FROM demande WHERE numappart = NEW.numappart;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
