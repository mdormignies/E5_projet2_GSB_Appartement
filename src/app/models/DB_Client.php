<?php

// Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Origin: *");
// Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Autoriser les en-têtes spécifiés
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// Renvoyer le type de contenu JSON
header("Content-Type: application/json");


require_once('db.php');

//-----------------------------------------------------------------------------------------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    //----------------  LOGIN  ----------------------\\
    if ($data['action'] === 'login') {

        $num_cli = $conn->real_escape_string($data['num_cli']);
        $mdp_cli = $conn->real_escape_string($data['mdp_cli']);

        $result = $conn->query("SELECT * FROM client WHERE num_cli = $num_cli AND mdp_cli = '$mdp_cli';");

        if ($result->num_rows > 0) {
            echo json_encode(['message' => 'Authentification réussie']);
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Échec de l\'authentification']);
        }

    //----------------  REGISTER  ----------------------\\
    } elseif ($data['action'] === 'register') {
        
        $nom_cli = $conn->real_escape_string($data['nom_cli']);
        $prenom_cli = $conn->real_escape_string($data['prenom_cli']);
        $adresse_cli = $conn->real_escape_string($data['adresse_cli']);
        $codeville_cli = $conn->real_escape_string($data['codeville_cli']);
        $tel_cli = $conn->real_escape_string($data['tel_cli']);
        $mdp_cli = $conn->real_escape_string($data['mdp_cli']);

        $conn->query("INSERT INTO client (nom_cli, prenom_cli, adresse_cli, codeville_cli, tel_cli, mdp_cli) 
                        VALUES ('$nom_cli', '$prenom_cli', '$adresse_cli', '$codeville_cli', '$tel_cli', '$mdp_cli');");

        echo json_encode(['message' => 'Inscription réussie']);

    //----------------  DEFAULT  ----------------------\\
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Action non spécifiée ou non reconnue']);
    }
}

?>