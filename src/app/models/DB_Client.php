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

//-------------------------- CONNEXION ---------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['login'])) {
    $data = json_decode(file_get_contents('php://input'), true);

    // Assurez-vous de valider et d'échapper les données avant la vérification
    $num_cli = $conn->real_escape_string($data['num_cli']);
    $mdp_cli = $conn->real_escape_string($data['mdp_cli']);

    // Vérifier l'authentification dans la base de données
    $result = $conn->query("SELECT * FROM client WHERE num_cli = $num_cli AND mdp_cli = '$mdp_cli' ;");

    if ($result->num_rows > 0) {
        echo json_encode(['message' => 'Authentification réussie']);
    } else {
        http_response_code(401);
        echo json_encode(['message' => 'Échec de l\'authentification']);
    }
}

//-------------------------- INSCRIPTION ---------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['register'])) {
    $data = json_decode(file_get_contents('php://input'), true);

    // Assurez-vous de valider et d'échapper les données avant la vérification
    $num_cli = $conn->real_escape_string($data['num_cli']);
    $mdp_cli = $conn->real_escape_string($data['mdp_cli']);

    // Vérifier l'authentification dans la base de données
    $result = $conn->query("SELECT * FROM client WHERE num_cli = $num_cli AND mdp_cli = '$mdp_cli' ;");

    if ($result->num_rows > 0) {
        echo json_encode(['message' => 'Authentification réussie']);
    } else {
        http_response_code(401);
        echo json_encode(['message' => 'Échec de l\'authentification']);
    }
}

?>