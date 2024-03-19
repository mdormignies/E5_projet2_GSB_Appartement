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

//-----------------------------------------------------------------------------------------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    //----------------  AJOUTER  ----------------------\\
    if ($data['action'] === 'ajouter') {

        $num_cli = $conn->real_escape_string($data['num_cli']);
        $numappart = $conn->real_escape_string($data['numappart']);
        $date_visite = $conn->real_escape_string($data['date_visite']);

        $conn->query("INSERT INTO visiter (numappart, num_cli, date_visite) 
                        VALUES ($numappart, $num_cli, '$date_visite');");

        echo json_encode(['message' => 'Ajout réussie']);

    //----------------  MODIFIER  ----------------------\\
    } elseif ($data['action'] === 'modifier') {

        $num_cli = $conn->real_escape_string($data['num_cli']);
        $numappart = $conn->real_escape_string($data['numappart']);
        $date_visite = $conn->real_escape_string($data['date_visite']);

        $conn->query("UPDATE visiter 
                        SET date_visite = '$date_visite' 
                        WHERE numappart = $numappart AND num_cli = $num_cli;");

        echo json_encode(['message' => 'Modification réussie']);

    //----------------  SUPPRIMER  ----------------------\\
    } elseif ($data['action'] === 'supprimer') {

        $num_cli = $conn->real_escape_string($data['num_cli']);
        $numappart = $conn->real_escape_string($data['numappart']);
        $date_visite = $conn->real_escape_string($data['date_visite']);

        $conn->query("DELETE FROM visiter 
                        WHERE date_visite = '$date_visite' AND numappart = $numappart AND num_cli = $num_cli;");

        echo json_encode(['message' => 'Suppression réussie']);

    //----------------  DEFAULT  ----------------------\\
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Action non spécifiée ou non reconnue']);
    }
}

//------------------------------------------- CHARGER LA LISTE DES VISITES -------------------------------------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = $conn->query("SELECT client.nom_cli, client.prenom_cli, proprietaire.nom, proprietaire.prenom, visiter.date_visite, appartement.numappart, client.num_cli, proprietaire.numeroprop
                                    FROM client JOIN visiter ON client.num_cli = visiter.num_cli
                                    JOIN appartement ON visiter.numappart = appartement.numappart
                                    JOIN proprietaire ON proprietaire.numeroprop = appartement.numeroprop
                                    WHERE visiter.num_cli = $id OR proprietaire.numeroprop = $id ;");

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

?>