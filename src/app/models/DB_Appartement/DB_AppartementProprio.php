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

//-------------------------------------- GET APPARTEMENT --------------------------------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = $conn->query("SELECT locataire.numeroloc, locataire.nom_loc, locataire.prenom_loc, appartement.*
                                    FROM locataire
                                    RIGHT JOIN appartement ON locataire.numappart = appartement.numappart
                                    WHERE numeroprop = $id;");

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

//------------------------------------------- POST APPARTEMENT -------------------------------------------------------\\

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    //----------------  AJOUTER  ----------------------\\
    if ($data['action'] === 'ajouter') {

        $numeroprop = $conn->real_escape_string($data['numeroprop']);
        $rue = $conn->real_escape_string($data['rue']);
        $arrondisse = $conn->real_escape_string($data['arrondisse']);
        $etage = $conn->real_escape_string($data['etage']);
        $typappart = $conn->real_escape_string($data['typappart']);
        $prix_loc = $conn->real_escape_string($data['prix_loc']);
        $prix_charg = $conn->real_escape_string($data['prix_charg']);
        $ascenseur = $conn->real_escape_string($data['ascenseur']);
        $preavis = $conn->real_escape_string($data['preavis']);
        $date_libre = $conn->real_escape_string($data['date_libre']);

        $stmt = $conn->prepare("INSERT INTO appartement (numeroprop, rue, arrondisse, etage, typappart, prix_loc, prix_charg, ascenseur, preavis, date_libre) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                        
        $ascenseur_int = $ascenseur ? 1 : 0;
        $preavis_int = $preavis ? 1 : 0;

        $stmt->bind_param("isiisiiiis", $numeroprop, $rue, $arrondisse, $etage, $typappart, $prix_loc, $prix_charg, $ascenseur, $preavis, $date_libre);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Ajout réussi']);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['message' => 'Erreur lors de l\'ajout de l\'appartement']);
        }

    //----------------  MODIFIER  ----------------------\\
    } elseif ($data['action'] === 'modifier') {

        $numappart = $conn->real_escape_string($data['numappart']);
        $modifDate = $conn->real_escape_string($data['modifDate']);

        $conn->query("UPDATE appartement 
                        SET date_libre = '$modifDate' 
                        WHERE numappart = $numappart ;");

        echo json_encode(['message' => 'Modification réussie']);

    //----------------  SUPPRIMER  ----------------------\\
    } elseif ($data['action'] === 'supprimer') {

        $numappart = $conn->real_escape_string($data['numappart']);

        $conn->query("DELETE FROM appartement 
                        WHERE numappart = $numappart ;");

        echo json_encode(['message' => 'Suppression réussie']);

    //----------------  DEFAULT  ----------------------\\
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Action non spécifiée ou non reconnue']);
    }
}

?>