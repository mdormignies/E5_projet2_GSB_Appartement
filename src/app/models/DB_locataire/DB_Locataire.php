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

        $email_loc = $conn->real_escape_string($data['email_loc']);
        $mdp_loc = $conn->real_escape_string($data['mdp_loc']);

        $result = $conn->query("SELECT * FROM locataire WHERE email_loc = '$email_loc' AND mdp_loc = '$mdp_loc';");

        if ($result->num_rows > 0) {
            echo json_encode(['message' => 'Authentification réussie']);
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Échec de l\'authentification']);
        }

        //----------------  AJOUTER  ----------------------\\
    } elseif ($data['action'] === 'ajouter') {
        
        $nom_loc = $conn->real_escape_string($data['nom_loc']);
        $prenom_loc = $conn->real_escape_string($data['prenom_loc']);
        $rib = $conn->real_escape_string($data['rib']);
        $datenaiss = $conn->real_escape_string($data['datenaiss']);
        $tel_loc = $conn->real_escape_string($data['tel_loc']);
        $email_loc = $conn->real_escape_string($data['email_loc']);
        $mdp_loc = $conn->real_escape_string($data['mdp_loc']);
        $tel_banque = $conn->real_escape_string($data['tel_banque']);
        $numappart = $conn->real_escape_string($data['numappart']);

        $conn->query("INSERT INTO locataire (nom_loc, prenom_loc, r_i_b, datenaiss, tel_loc, email_loc, mdp_loc, tel_banque, numappart) 
                        VALUES ('$nom_loc', '$prenom_loc', $rib, '$datenaiss', '$tel_loc', '$email_loc', '$mdp_loc', '$tel_banque', $numappart);");

        echo json_encode(['message' => 'Inscription réussie, vous pouvez à présent vous connecter en tant que locataire.']);

    //----------------  MODIFIER  ----------------------\\
    } elseif ($data['action'] === 'modifier') {

        $numeroloc = $conn->real_escape_string($data['numeroloc']);
        $tel_loc = $conn->real_escape_string($data['tel_loc']);

        $conn->query("UPDATE locataire 
                        SET tel_loc = '$tel_loc'
                        WHERE numeroloc = $numeroloc ;");

        echo json_encode(['message' => 'Modification réussie']);

    //----------------  SUPPRIMER  ----------------------\\
    } elseif ($data['action'] === 'supprimer') {

        $numeroloc = $conn->real_escape_string($data['numeroloc']);

        $conn->query("DELETE FROM locataire 
                        WHERE numeroloc = $numeroloc ;");

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
            $result = $conn->query("SELECT numeroloc, nom_loc, prenom_loc, datenaiss, tel_loc, rue, arrondisse, SUM(prix_loc+prix_charg) AS loyer
                                    FROM locataire JOIN appartement ON locataire.numappart = appartement.numappart
                                    WHERE numeroloc = $id ;");

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

?>