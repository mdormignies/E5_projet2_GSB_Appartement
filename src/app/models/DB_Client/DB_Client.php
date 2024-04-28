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

    //----------------  LOGIN  ----------------------\\
    if ($data['action'] === 'login') {
        $email_cli = $conn->real_escape_string($data['email_cli']);
        $mdp_cli = $conn->real_escape_string($data['mdp_cli']);
    
        $result = $conn->query("SELECT * FROM client WHERE email_cli = '$email_cli';");
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $hashed_password = $row['mdp_cli'];
            // Vérifier le mot de passe haché
            if (password_verify($mdp_cli, $hashed_password)) {
                echo json_encode(['message' => 'Authentification réussie']);
            } else {
                http_response_code(401);
                echo json_encode(['message' => 'Échec de l\'authentification']);
            }
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
        $email_cli = $conn->real_escape_string($data['email_cli']);
        $mdp_cli = $conn->real_escape_string($data['mdp_cli']);

            // Hacher le mot de passe
        $hashed_password = password_hash($mdp_cli, PASSWORD_DEFAULT);

        $conn->query("INSERT INTO client (nom_cli, prenom_cli, adresse_cli, codeville_cli, tel_cli, email_cli, mdp_cli) 
                        VALUES ('$nom_cli', '$prenom_cli', '$adresse_cli', '$codeville_cli', '$tel_cli', '$email_cli', '$hashed_password');");

        echo json_encode(['message' => 'Inscription réussie']);

    //----------------  MODIFIER  ----------------------\\
    } elseif ($data['action'] === 'modifier') {

        $num_cli = $conn->real_escape_string($data['num_cli']);
        $adresse_cli = $conn->real_escape_string($data['adresse_cli']);
        $codeville_cli = $conn->real_escape_string($data['codeville_cli']);

        $conn->query("UPDATE client 
                        SET adresse_cli = '$adresse_cli', codeville_cli = '$codeville_cli' 
                        WHERE num_cli = $num_cli ;");

        echo json_encode(['message' => 'Modification réussie']);

    //----------------  SUPPRIMER  ----------------------\\
    } elseif ($data['action'] === 'supprimer') {

        $num_cli = $conn->real_escape_string($data['num_cli']);

        $conn->query("DELETE FROM client 
                        WHERE num_cli = $num_cli ;");

        echo json_encode(['message' => 'Suppression réussie']);

    //----------------  DEFAULT  ----------------------\\
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Action non spécifiée ou non reconnue']);
    }
}

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

    if (isset($_GET['email'])) {
            $email = $_GET['email'];
            $result = $conn->query("SELECT num_cli FROM client WHERE email_cli = '$email' ;");

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

?>