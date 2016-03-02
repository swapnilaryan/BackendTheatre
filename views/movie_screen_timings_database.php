<?php
session_start();
include 'localhost.php';
$post = file_get_contents('php://input');
$received_data_post = json_decode($post,true);

$hostname = $database_connection['hostname'];
$databasename = $database_connection['dbname'];
$username = $database_connection['username'];
$password = $database_connection['password'];
$port = $database_connection['port'];
if(!$post){
    try {
        $conn = new PDO("mysql:host=$hostname;port=$port;dbname=$databasename;", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql_movie_screen_time = "select * from movie_screen_time ORDER BY screen_no";
        $prepare_movie_screen_time = $conn->prepare($sql_movie_screen_time);
        $prepare_movie_screen_time->execute();
        $results_movie_screen_time = $prepare_movie_screen_time->fetchAll(PDO::FETCH_ASSOC);
        $json=json_encode($results_movie_screen_time);
        echo $json;
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
}else {
    try {
        $conn = new PDO("mysql:host=$hostname;port=$port;dbname=$databasename;", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo "Connected successfully";
        $movie_screen_timings_insert = $conn->prepare("INSERT INTO movie_screen_time (
                                              screen_no,
                                              movie_name,
                                              movie_imdbId,
                                              start_time,
                                              end_time,
                                              date)
                                  VALUES (:screen_no,
                                          :movie_name,
                                          :movie_imdbId,
                                          :start_time,
                                          :end_time,
                                          :date)");
        $movie_screen_timings_insert->bindParam(':screen_no',$received_data_post['screen_no']);
        $movie_screen_timings_insert->bindParam(':movie_name',$received_data_post['movie_name']);
        $movie_screen_timings_insert->bindParam(':movie_imdbId',$received_data_post['movie_imdbId']);
        $movie_screen_timings_insert->bindParam(':start_time',$received_data_post['start_time']);
        $movie_screen_timings_insert->bindParam(':end_time',$received_data_post['end_time']);
        $movie_screen_timings_insert->bindParam(':date',$received_data_post['date']);
        $movie_screen_timings_insert->execute();
        $last_inserted_id = $conn->lastInsertId();
        $sql_select_last_inserted_movie = "select * from movie_screen_time where movie_screen_time_id=".$last_inserted_id;
        $results = $conn->prepare($sql_select_last_inserted_movie);
        $results->execute();
        $result_select_last_inserted_movie = $results->fetchAll(PDO::FETCH_ASSOC);
        $json=json_encode($result_select_last_inserted_movie);
        echo $json;
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
}

/*$sql_select_last_inserted_movie = "select * from movie_screen_time ORDER BY screen_no";
    $results = $conn->prepare($sql_select_last_inserted_movie);
    $results->execute();
    $result_select_last_inserted_movie = $results->fetchAll(PDO::FETCH_ASSOC);
    $json=json_encode($result_select_last_inserted_movie);
    echo $json;*/