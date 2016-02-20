<?php
session_start();
include 'headers.php';
?>
<!DOCTYPE html>
<html lang="en" xmlns:http="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/html">
<head>
	<title>Search Results</title>
	<meta charset="utf-8">
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
	header("refresh:1;url=/views/not_found.php" );
}
$url_movieTitle = rawurlencode($movieTitle);
$url_for_search_movie_by_title = 'http://www.omdbapi.com/?type=movie&tomatoes=true&y='.date('Y').'&t='.$url_movieTitle;
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url_for_search_movie_by_title);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
$content = curl_exec($ch);
$movie_results = json_decode($content,true);
$image = $movie_results['Poster'];
$title = $movie_results['Title'];
?>
<?php
include "footers.php";
?>
<body id="search_results_body">
<div id="search_results" class="container-viewport">
	<h3 align="center">Search Results for : <?php echo $movieTitle ?></h3>
	<hr>
	<div class="row">
        <div class="col-xs-6">
			<div class="panel panel-default">
				<div class="container">
					<div class="col-xs-6 col-md-6 col-sm-6">
						<a href="<?php echo "/views/movie_add_to_screen.php?arg=".rawurlencode(json_encode($movie_results)); ?>">
							<img class="img-responsive" id="found_searched_movie_image" src = <?php echo $movie_results['Poster']; ?>>
						</a>
					</div>
					<div class="col-xs-6 col-md-6 col-sm-6">
						<h5> <?php echo $movie_results['Title']." (".$movie_results['Year'].")"; ?> </h5>
						<h5> <?php echo $movie_results['Genre']; ?> </h5>
						<h5> <?php echo $movie_results['Runtime']; ?> </h5>
					</div>
				</div>
			</div>
            <!--<a id="found_searched_movie_poster" href = <?php /*echo "/views/movie_add_to_screen.php?arg=".rawurlencode(json_encode($movie_results)); */?>>
            <img class="img-responsive" id="found_searched_movie_image" src = <?php /*echo $movie_results['Poster']; */?>>
            </a>-->
        </div>
	</div>
</div>
</body>
</html>

