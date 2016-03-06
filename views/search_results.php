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
<!--	 style="margin-top: 20px; margin-bottom: 20px"		<div class="panel panel-default">-->
				<div class="search_frame">
<!--                    <div class="col-xs-3 col-md-3 col-lg-3 col-sm-3"></div>-->
<!--					<div class="col-xs-3 col-md-3 col-lg-3 col-sm-3">-->
						<a href="<?php echo "/views/movie_add_to_screen.php?arg=".rawurlencode(json_encode($movie_results)); ?>">
							<img id="found_searched_movie_image" style="height: 135px; width: 100px; border: 0px;" src="
							            <?php
                                        if($movie_results['Poster']=='N/A'){
                                            echo "/images/image_not_found.jpg";
                                        }
                                        else
                                            echo  data_uri($movie_results['Poster'],'image/png'); ?>">
						</a>
                     <span><h5> <?php echo $movie_results['Title']." (".$movie_results['Year'].")"; ?> </h5>
						<h5> <?php echo $movie_results['Genre']; ?> </h5>
						<h5> <?php echo $movie_results['Released']; ?> </h5></span>

<!--					</div>-->
<!--                    <div class="col-xs-3 col-md-3 col-lg-3 col-sm-3" style="color: snow">-->
<!--						<h5> --><?php //echo $movie_results['Title']." (".$movie_results['Year'].")"; ?><!-- </h5>-->
<!--						<h5> --><?php //echo $movie_results['Genre']; ?><!-- </h5>-->
<!--						<h5> --><?php //echo $movie_results['Released']; ?><!-- </h5>-->
<!--					</div>-->
<!--                    <div class="col-xs-3 col-md-3 col-lg-3 col-sm-3"></div>-->
				</div>
<!--			</div>-->
<!--        </div>-->
        <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
	</div>
</div>
<div class="row">
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
    <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
        <div style="border-bottom: 1px dashed #666"></div>
    </div>
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
</div>
<?php include 'footers_test.php'?>
</body>
</html>
<?php
//include "footers.php";
?>