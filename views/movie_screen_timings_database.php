<?php
session_start();
include 'localhost.php';
$option = isset($_POST['addToDB']) ? $_GET['addToDB'] : false;
if ($option) {
    echo htmlentities($_GET['addToDB'], ENT_QUOTES, "UTF-8");
} else {
    echo "You did not select any screen. Go Back and select one ";
    exit;
}
$hostname = $database_connection['hostname'];
$databasename = $database_connection['dbname'];
$username = $database_connection['username'];
$password = $database_connection['password'];
$port = $database_connection['port'];
try {
    $conn = new PDO("mysql:host=$hostname;port=$port;dbname=$databasename;", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
}
catch(PDOException $e){
    echo $e->getMessage();
}