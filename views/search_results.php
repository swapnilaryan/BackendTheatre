<?php
session_start();
//include 'headers.php';
include './../getImage.php';
//include './../imdb.php';
?>
<!DOCTYPE html>
<html lang="en" xmlns:http="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/html">
<head>
	<title>Search Results</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="/styles/style.css" type="text/css" media="all" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/styles/search_results.css">
</head>
<?php
//call OMDB api :-
$movieTitle = trim($_GET["srch-term"]);
if(!$movieTitle) {
	header("refresh:0;url=/views/not_found.php" );
    die();
}
$url_movieTitle = rawurlencode($movieTitle);
$url_for_search_movie_by_title = 'http://www.omdbapi.com/?type=movie&tomatoes=true&y='.date('Y').'&t='.$url_movieTitle;
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url_for_search_movie_by_title);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
$content = curl_exec($ch);
$movie_results = json_decode($content,true);
$image = file_get_contents($movie_results['Poster']);
file_put_contents('../images/'.$movie_results['Title'].'.jpg', $image);
$movie_results['Poster'] = '../images/'.$movie_results['Title'].'.jpg';
//echo $movie_results['Poster'];
//print_r($movie_results['Poster']);
if($movie_results['Response']=='False'){
    header("refresh:0;url=/views/not_found.php" );
    die();
}
?>
<body style='background-image: url("/images/body-bg.gif")'>
<div class="row">
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
    <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
        <?php include 'headers_test.php'; ?>
    </div>
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
</div>
<div id="search_results" class="container-viewport">
	<h3 align="center" style="color: #f3b12b">Search Results for : <?php echo $movieTitle ?></h3>
    <div class="row">
        <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
        <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
            <div style="border-bottom: 1px dashed #666"></div>
        </div>
        <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
    </div>
	<div class="row">
        <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
        <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
            <div class="col-xs-3 col-md-3 col-lg-3 col-sm-3"></div>
				<div class="search_frame" style="margin-top: 10px; ">
                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-lg-4 col-sm-4">
                            <a href="<?php echo "/views/movie_add_to_screen.php?arg=".rawurlencode(json_encode($movie_results)); ?>">
                                <img id="found_searched_movie_image" style="height: 183px; width: auto; border: 0px;" src="
							            <?php
                                if($movie_results['Poster']=='N/A'){
                                    echo "/images/image_not_found.jpg";
                                }
                                else{
                                    echo $movie_results['Poster'];
                                }
                                ?>">
                            </a>
                        </div>
                        <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8" id="movie_short_details">
                            <h5> <?php echo $movie_results['Title']." (".$movie_results['Year'].")"; ?> </h5>
                            <h5> <?php echo $movie_results['Genre']; ?> </h5>
                            <h5> <?php echo $movie_results['Released']; ?> </h5>
                            <h5> <?php echo $movie_results['Actors']; ?> </h5>
                        </div>
                    </div>
				</div>
        <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
	</div>
</div>
<?php include 'footers_test.php'?>
</body>
</html>
<?php
//include "footers.php";
?>