<?php
require_once('config.php');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die("La connexion à la base de données a échoué: " . $conn->connect_error);
}
?>