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

        $email_prop = $conn->real_escape_string($data['email_prop']);
        $mdp_prop = $conn->real_escape_string($data['mdp_prop']);

        $result = $conn->query("SELECT * FROM proprietaire WHERE email_prop = '$email_prop';");

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $hashed_password = $row['mdp_prop'];
            // Vérifier le mot de passe haché
            if (password_verify($mdp_prop, $hashed_password)) {
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
        
        $nom_prop = $conn->real_escape_string($data['nom_prop']);
        $prenom_prop = $conn->real_escape_string($data['prenom_prop']);
        $adresse_prop = $conn->real_escape_string($data['adresse_prop']);
        $codeville_prop = $conn->real_escape_string($data['codeville_prop']);
        $tel_prop = $conn->real_escape_string($data['tel_prop']);
        $email_prop = $conn->real_escape_string($data['email_prop']);
        $mdp_prop = $conn->real_escape_string($data['mdp_prop']);

            // Hacher le mot de passe
        $hashed_password = password_hash($mdp_prop, PASSWORD_DEFAULT);

        $conn->query("INSERT INTO proprietaire (nom, prenom, adresse, code_ville, tel, email_prop, mdp_prop) 
                        VALUES ('$nom_prop', '$prenom_prop', '$adresse_prop', '$codeville_prop', '$tel_prop', '$email_prop', '$hashed_password');");

        echo json_encode(['message' => 'Inscription réussie']);

    //----------------  MODIFIER  ----------------------\\
    } elseif ($data['action'] === 'modifier') {

        $numeroprop = $conn->real_escape_string($data['numeroprop']);
        $adresse = $conn->real_escape_string($data['adresse_prop']);
        $code_ville = $conn->real_escape_string($data['codeville_prop']);

        $conn->query("UPDATE proprietaire 
                        SET adresse = '$adresse', code_ville = '$code_ville' 
                        WHERE numeroprop = $numeroprop ;");

        echo json_encode(['message' => 'Modification réussie']);

    //----------------  SUPPRIMER  ----------------------\\
    } elseif ($data['action'] === 'supprimer') {

        $numeroprop = $conn->real_escape_string($data['numeroprop']);

        $conn->query("DELETE FROM proprietaire 
                        WHERE numeroprop = $numeroprop ;");

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
            $result = $conn->query("SELECT numeroprop, nom, prenom, adresse, code_ville, tel, email_prop 
                                    FROM proprietaire 
                                    WHERE numeroprop = $id ;");

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }

    if (isset($_GET['cotis'])) {
        $id = $_GET['cotis'];
        $result = $conn->query("SELECT
                                    SUM(prix_loc + prix_charg) * 0.93 AS revenu,
                                    SUM(prix_loc + prix_charg) * 0.07 AS charg_a_gsb
                                FROM proprietaire 
                                    JOIN appartement ON proprietaire.numeroprop = appartement.numeroprop
                                    LEFT JOIN locataire ON appartement.numappart = locataire.numappart
                                WHERE proprietaire.numeroprop = $id AND appartement.numeroprop = $id 
                                    AND locataire.numeroloc IS NOT NULL;"); 
                                // calcule le revenu en fonction de s'il y a un locataire dans l'appartement ou non

    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($data);
}

    if (isset($_GET['email'])) {
            $email = $_GET['email'];
            $result = $conn->query("SELECT numeroprop FROM proprietaire WHERE email_prop = '$email' ;");

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

?>