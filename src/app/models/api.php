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

// Exemple de récupération de données
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM persons");
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($data);
}

// Exemple d'ajout de données
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Assurez-vous de valider et d'échapper les données avant l'insertion
    $name = $conn->real_escape_string($data['name']);
    $age = $conn->real_escape_string($data['age']);

    $conn->query("INSERT INTO persons (name, age) VALUES ('$name', $age)");
    echo json_encode(['message' => 'Données ajoutées avec succès']);
}
?>