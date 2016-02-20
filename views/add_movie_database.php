<?php
session_start();
include 'localhost.php';
$received_data = $_SESSION['received_data'];
echo $received_data['Title'];
$received_data['Trailer'] = "TRailer Text";
// var_dump($received_data);
$option = isset($_GET['screen_no']) ? $_GET['screen_no'] : false;
if ($option) {
    echo htmlentities($_GET['screen_no'], ENT_QUOTES, "UTF-8");
} else {
    echo "You did not select any screen. Go Back and select one ";
    exit;
}
$hostname = $database_connection['hostname'];
$databasename = $database_connection['dbname'];
$username = $database_connection['username'];
$password = $database_connection['password'];
try {
    $conn = new PDO("mysql:host=$hostname;dbname=$databasename;", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
    // Check if that movie already exists in Database
    $check_if_movie_already_exists = $conn->prepare("select count(*) from movie_details where movie_imdbId = :imdbId");
    $check_if_movie_already_exists->bindParam(':imdbId',$received_data['imdbID']);
    $check_if_movie_already_exists->execute();
    $check_response = $check_if_movie_already_exists->fetchAll(PDO::FETCH_COLUMN, 0);

    if($check_response[0] < 1 ) {
        $movie_details_insert = $conn->prepare("INSERT INTO movie_details (
                                              movie_imdbId,
                                              movie_Title,
                                              movie_Year,
                                              movie_Rated,
                                              movie_Released,
                                              movie_Runtime,
                                              movie_Genre,
                                              movie_Plot,
                                              movie_imdbVotes,
                                              movie_Poster,
                                              movie_imdbRating,
                                              movie_tomatoMeter,
                                              movie_tomatoRating,
                                              movie_tomatoReviews,
                                              movie_tomatoFresh,
                                              movie_tomatoRotten,
                                              movie_tomatoConsensus,
                                              movie_tomatoUserMeter,
                                              movie_tomatoUserRating,
                                              movie_tomatoUserReviews,
                                              movie_tomatoURL,
                                              movie_trailer)
                      VALUES (
                              :imdbId,
                              :Title,
                              :Year,
                              :Rated,
                              :Released,
                              :Runtime,
                              :Genre,
                              :Plot,
                              :imdbVotes,
                              :Poster,
                              :imdbRating,
                              :tomatoMeter,
                              :tomatoRating,
                              :tomatoReviews,
                              :tomatoFresh,
                              :tomatoRotten,
                              :tomatoConsensus,
                              :tomatoUserMeter,
                              :tomatoUserRating,
                              :tomatoUserReviews,
                              :tomatoURL,
                              :trailer
                              )");
        $movie_details_insert->bindParam(':imdbId',$received_data['imdbID']);
        $movie_details_insert->bindParam(':Title',$received_data['Title']);
        $movie_details_insert->bindParam(':Title',$received_data['Year']);
        $movie_details_insert->bindParam(':Rated',$received_data['Rated']);
        $movie_details_insert->bindParam(':Released',$received_data['Released']);
        $movie_details_insert->bindParam(':Runtime',$received_data['Runtime']);
        $movie_details_insert->bindParam(':Genre',$received_data['Genre']);
        $movie_details_insert->bindParam(':Plot',$received_data['Plot']);
        $movie_details_insert->bindParam(':imdbVotes',$received_data['imdbVotes']);
        $movie_details_insert->bindParam(':Poster',$received_data['Poster']);
        $movie_details_insert->bindParam(':imdbRating',$received_data['imdbRating']);
        $movie_details_insert->bindParam(':tomatoMeter',$received_data['tomatoMeter']);
        $movie_details_insert->bindParam(':tomatoRating',$received_data['tomatoRating']);
        $movie_details_insert->bindParam(':tomatoReviews',$received_data['tomatoReviews']);
        $movie_details_insert->bindParam(':tomatoFresh',$received_data['tomatoFresh']);
        $movie_details_insert->bindParam(':tomatoRotten',$received_data['tomatoRotten']);
        $movie_details_insert->bindParam(':tomatoConsensus',$received_data['tomatoConsensus']);
        $movie_details_insert->bindParam(':tomatoUserMeter',$received_data['tomatoUserMeter']);
        $movie_details_insert->bindParam(':tomatoUserRating',$received_data['tomatoUserRating']);
        $movie_details_insert->bindParam(':tomatoUserReviews',$received_data['tomatoUserReviews']);
        $movie_details_insert->bindParam(':tomatoUserReviews',$received_data['tomatoUserReviews']);
        $movie_details_insert->bindParam(':tomatoURL',$received_data['tomatoURL']);
        $movie_details_insert->bindParam(':trailer',$received_data['Trailer']);

        $movie_details_insert->execute();
        // movie scrren and time details required
    }
    else {
        echo "This movie already exists in database.".PHP_EOL."Redirecting you to Home Page";
    }
    //header("Location: /index.php");
    header("refresh:5;url=/index.php" );
}
catch(PDOException $e)
{
    echo "Connection failed ". $e->getMessage();
}
session_abort();