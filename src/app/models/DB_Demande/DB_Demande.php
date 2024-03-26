<?php

// Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Origin: *");
// Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Autoriser les en-têtes spécifiés
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// Renvoyer le type de contenu JSON
header("Content-Type: application/json");


require_once('../db.php');

//------------------------------------------ ENVOIE DE DONNEES --------------------------------------------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    //----------------  AJOUTER  ----------------------\\
    if ($data['action'] === 'ajouter') {
        
        $statut_dem = $conn->real_escape_string($data['statut_dem']);
        $numappart = $conn->real_escape_string($data['d_numappart']);
        $num_cli = $conn->real_escape_string($data['d_num_cli']);
        $numeroprop = $conn->real_escape_string($data['d_numeroprop']);

        $conn->query("INSERT INTO demande (statut_dem, numappart, num_cli, numeroprop) 
                        VALUES ('$statut_dem', $numappart, $num_cli, $numeroprop);");

        echo json_encode(['message' => 'Ajout réussie']);

    //----------------  MODIFIER  ----------------------\\
    } elseif ($data['action'] === 'modifier') {

        $num_dem = $conn->real_escape_string($data['num_dem']);

        $conn->query("UPDATE demande 
                        SET statut_dem = 'Accepté'
                        WHERE num_dem = $num_dem ;");

        echo json_encode(['message' => 'Modification réussie']);

    //----------------  SUPPRIMER  ----------------------\\
    } elseif ($data['action'] === 'supprimer') {

        $num_dem = $conn->real_escape_string($data['num_dem']);

        $conn->query("DELETE FROM demande
                        WHERE num_dem = $num_dem ;");

        echo json_encode(['message' => 'Suppression réussie']);

    //----------------  DEFAULT  ----------------------\\
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Action non spécifiée ou non reconnue']);
    }
}

//------------------------------------------- CHARGER LE PROFIL -------------------------------------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['idcli'])) {
            $id = $_GET['idcli'];
            $result = $conn->query("SELECT demande.*, client.nom_cli, client.prenom_cli, proprietaire.nom AS p_nom, proprietaire.prenom AS p_prenom
                                    FROM demande 
                                    JOIN appartement ON demande.numappart = appartement.numappart
                                    JOIN proprietaire ON demande.numeroprop = proprietaire.numeroprop
                                    JOIN client ON demande.num_cli = client.num_cli
                                    WHERE demande.num_cli = $id ;");
    }

    if (isset($_GET['idprop'])) {
        $id = $_GET['idprop'];
        $result = $conn->query("SELECT demande.*, client.nom_cli, client.prenom_cli, proprietaire.nom AS p_nom, proprietaire.prenom AS p_prenom
                                FROM demande 
                                JOIN appartement ON demande.numappart = appartement.numappart
                                JOIN proprietaire ON demande.numeroprop = proprietaire.numeroprop
                                JOIN client ON demande.num_cli = client.num_cli
                                WHERE demande.numeroprop = $id ;");
    }

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
}

?>