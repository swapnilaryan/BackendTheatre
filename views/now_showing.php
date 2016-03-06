<?php
//Start to fetch data from the database
include 'localhost.php';
//database connect
$hostname = $database_connection['hostname'];
$databasename = $database_connection['dbname'];
$username = $database_connection['username'];
$password = $database_connection['password'];
$port = $database_connection['port'];
//end database connect
$screen_no =htmlspecialchars($_GET["screen_no"]);
if($screen_no==null) {

    //start actual query
    try {
        $conn = new PDO("mysql:host=$hostname;port=$port;dbname=$databasename;", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo "Connected successfully";
        $query = "SELECT * FROM movie_screen_time GROUP BY movie_name";
        $query_movie_screen_time = $conn->prepare($query);
        $query_movie_screen_time->execute();
        $result_movie_screen_time = $query_movie_screen_time->fetchAll(PDO::FETCH_ASSOC);
        //    print_r($result_movie_screen_time);
        $now_showing_movies = array();
        for ($i = 0; $i < count($result_movie_screen_time); $i++) {
            //echo PHP_EOL."  i =       ".$i."         ".$result_movie_screen_time[$i]['movie_imdbId'];
            $query_prepare = $conn->prepare("SELECT * FROM movie_details WHERE movie_imdbId  = :imdbId");
            $query_prepare->bindParam(':imdbId', $result_movie_screen_time[$i]['movie_imdbId']);
            $query_prepare->execute();
            $check_response = $query_prepare->fetch(PDO::FETCH_ASSOC);
            array_push($now_showing_movies, $check_response);
        }
        $now_showing_movies = json_encode($now_showing_movies);
        echo $now_showing_movies;
        //    $now_showing_movies_json = json_decode($now_showing_movies,true);
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
    //end querying
    //End fetching data
}
else {
    try {
        $conn = new PDO("mysql:host=$hostname;port=$port;dbname=$databasename;", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo "Connected successfully";
        $query = "SELECT * FROM movie_screen_time WHERE screen_no = ".$screen_no;
        $query_movie_screen_time = $conn->prepare($query);
        $query_movie_screen_time->execute();
        $result_movie_screen_time = $query_movie_screen_time->fetchAll(PDO::FETCH_ASSOC);
        //    print_r($result_movie_screen_time);
        $now_showing_movies = array();
        for ($i = 0; $i < count($result_movie_screen_time); $i++) {
            $query_prepare = $conn->prepare("SELECT * FROM movie_details WHERE movie_imdbId  = :imdbId");
            $query_prepare->bindParam(':imdbId', $result_movie_screen_time[$i]['movie_imdbId']);
            $query_prepare->execute();
            $check_response = $query_prepare->fetch(PDO::FETCH_ASSOC);
            array_push($now_showing_movies, $check_response);
        }
        $now_showing_movies = json_encode($now_showing_movies);
        echo $now_showing_movies;
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
}