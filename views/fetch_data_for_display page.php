<?php
session_start();
include 'localhost.php';
$hostname = $database_connection['hostname'];
$databasename = $database_connection['dbname'];
$username = $database_connection['username'];
$password = $database_connection['password'];
$port = $database_connection['port'];

try {
    $conn = new PDO("mysql:host=$hostname;port=$port;dbname=$databasename;", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully";
    $sql_select_all_movie = "select * from movie_details";
    $select_all_movie = $conn->prepare($sql_select_all_movie);
    $select_all_movie->execute();
    $results=$select_all_movie->fetchAll(PDO::FETCH_ASSOC);
    $json=json_encode($results);
    echo $json;
}
catch(PDOException $e)
{
    echo "Connection failed ". $e->getMessage();
}