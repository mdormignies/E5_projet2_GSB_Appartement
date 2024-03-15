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

    //----------------  LOGIN  ----------------------\\
    if ($data['action'] === 'login') {

        $numeroloc = $conn->real_escape_string($data['numeroloc']);
        $mdp_loc = $conn->real_escape_string($data['mdp_loc']);

        $result = $conn->query("SELECT * FROM locataire WHERE numeroloc = $numeroloc AND mdp_loc = '$mdp_loc';");

        if ($result->num_rows > 0) {
            echo json_encode(['message' => 'Authentification réussie']);
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Échec de l\'authentification']);
        }

    //----------------  DEFAULT  ----------------------\\
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Action non spécifiée ou non reconnue']);
    }
}

?>