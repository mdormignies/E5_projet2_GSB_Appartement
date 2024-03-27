<?php

// Autoriser l'accès depuis le site localhost
header("Access-Control-Allow-Origin: *");
// Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Autoriser les en-têtes spécifiés
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// Renvoyer le type de contenu JSON
header("Content-Type: application/json");

require_once('../db.php');

//------------------------------------------- CHARGER LE PROFIL -------------------------------------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $result = $conn->query("SELECT * FROM client WHERE num_cli = $id ;");

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }

    // Endpoint pour récupérer les statistiques
    elseif (isset($_GET['stats'])) {
        $stats = array();

        // Récupérer le nombre de clients
        $result = $conn->query("SELECT COUNT(*) AS total_clients FROM client");
        $row = $result->fetch_assoc();
        $stats['total_clients'] = $row['total_clients'];

        // Récupérer le nombre de propriétaires
        $result = $conn->query("SELECT COUNT(*) AS total_proprietaires FROM proprietaire");
        $row = $result->fetch_assoc();
        $stats['total_proprietaires'] = $row['total_proprietaires'];

        // Récupérer le nombre d'appartements
        $result = $conn->query("SELECT COUNT(*) AS total_appartements FROM appartement");
        $row = $result->fetch_assoc();
        $stats['total_appartements'] = $row['total_appartements'];

        // Récupérer le nombre de locataires
        $result = $conn->query("SELECT COUNT(*) AS total_locataires FROM locataire");
        $row = $result->fetch_assoc();
        $stats['total_locataires'] = $row['total_locataires'];

        echo json_encode($stats);
    }

    // Endpoint pour récupérer la liste des propriétaires
    elseif (isset($_GET['proprietaires'])) {
        $proprietaires = array();
        $result = $conn->query("SELECT * FROM proprietaire");

        while ($row = $result->fetch_assoc()) {
            $proprietaires[] = $row;
        }

        echo json_encode($proprietaires);
    }

    // Endpoint pour récupérer la liste des clients
    elseif (isset($_GET['clients'])) {
        $clients = array();
        $result = $conn->query("SELECT * FROM client");

        while ($row = $result->fetch_assoc()) {
            $clients[] = $row;
        }

        echo json_encode($clients);
    }

    // Endpoint pour récupérer le revenu
    elseif (isset($_GET['revenu'])) {
        $revenu = array();

        // Calculer le revenu
        $result = $conn->query("SELECT SUM(prix_loc + prix_charg) * 0.07 AS charg_a_gsb FROM proprietaire JOIN appartement ON proprietaire.numeroprop = appartement.numeroprop");
        $row = $result->fetch_assoc();
        $revenu['charg_a_gsb'] = $row['charg_a_gsb'];

        echo json_encode($revenu);
    }
}

?>