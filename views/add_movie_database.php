<?php
session_start();
include 'localhost.php';
$received_data = $_SESSION['received_data'];
$image = file_get_contents($received_data['Poster']);
file_put_contents('../images/'.$received_data['Title'].'.jpg', $image);
//$base64   = base64_encode($contents);
$received_data['Poster'] = file_get_contents('../images/'.$received_data['Title'].'.jpg');
//echo "-------------------------------------".strlen ($received_data['Poster']);
//echo $received_data['Title'];
$option = isset($_GET['addToDB']) ? $_GET['addToDB'] : false;
if ($option) {
    //echo htmlentities($_GET['addToDB'], ENT_QUOTES, "UTF-8");
} else {
    //echo "You did not select any screen. Go Back and select one ";
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
    //echo "Connected successfully";
    // Check if that movie already exists in Database
    $check_if_movie_already_exists = $conn->prepare("select * from movie_details where movie_imdbId = :imdbId");
    $check_if_movie_already_exists->bindParam(':imdbId',$received_data['imdbID']);
    $check_if_movie_already_exists->execute();
    $check_response = $check_if_movie_already_exists->fetchAll();//(PDO::FETCH_COLUMN, 0);
    $update_where_condition = $check_response[0][1];
//    print_r($check_response[0][1]);
    if(count($check_response) < 1 ) {
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
        $movie_details_insert->bindParam(':Year',$received_data['Year']);
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
        // movie screeen and time details required
    }
    else {
        $movie_details_insert = $conn->prepare("UPDATE movie_details SET
                                              movie_Title=:Title,
                                              movie_Year=:Year,
                                              movie_Rated=:Rated,
                                              movie_Released=:Released,
                                              movie_Runtime=:Runtime,
                                              movie_Genre=:Genre,
                                              movie_Plot=:Plot,
                                              movie_imdbVotes=:imdbVotes,
                                              movie_Poster=:Poster,
                                              movie_imdbRating=:imdbRating,
                                              movie_tomatoMeter=:tomatoMeter,
                                              movie_tomatoRating=:tomatoRating,
                                              movie_tomatoReviews=:tomatoReviews,
                                              movie_tomatoFresh=:tomatoFresh,
                                              movie_tomatoRotten=:tomatoRotten,
                                              movie_tomatoConsensus=:tomatoConsensus,
                                              movie_tomatoUserMeter=:tomatoUserMeter,
                                              movie_tomatoUserRating=:tomatoUserRating,
                                              movie_tomatoUserReviews=:tomatoUserReviews,
                                              movie_tomatoURL=:tomatoURL,
                                              movie_trailer=:trailer
                                              WHERE movie_imdbId=:imdbId");

        $movie_details_insert->bindParam(':imdbId',$update_where_condition);
        $movie_details_insert->bindParam(':Title',$received_data['Title']);
        $movie_details_insert->bindParam(':Year',$received_data['Year']);
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
        // movie screen and time details required
        //echo "Updating this existing movie in database.".PHP_EOL."Redirecting you to Home Page";
    }
   // header("Location: /views/movie_screen_timings.php");
    //header("refresh:5;url=/index.php" );
}
catch(PDOException $e)
{
    echo "Connection failed ". $e->getMessage();
}
session_abort();