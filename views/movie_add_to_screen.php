<?php
session_start();
include 'headers.php';
?>
<?php
include "footers.php";
?>
<!DOCTYPE html>
<html lang="en" xmlns:http="http://www.w3.org/1999/xhtml">
<head>
	<title>Add To Screen</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<link rel="stylesheet" href="/js/jquery.rateyo.css"/>
	<link rel="stylesheet" href="/styles/movie_add_to_screen.css">
</head>
<?php
if ($_GET['arg'] != null) {
	$received_data = $_GET['arg'];
	$received_data = urldecode($received_data);
	$received_data = json_decode($received_data,true);
    // Fetch the trailer of the movie here from Traileraddict api
    $get_trailer = rawurlencode($received_data['Title']);
    $url_get_trailer = 'https://www.youtube.com/embed?listType=search&list='.$get_trailer.'+Trailer';
//        'http://api.traileraddict.com/?count=1&width=680&credit=no&film='.$get_trailer;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL,$url_get_trailer);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/xml'));
    $content = curl_exec($ch);

    $_SESSION['received_data']=$received_data;
} else {
    echo 'Fail'; // Redirect to no results found page
}
?>

<body>
<div id="movie_add_to_screen" class="container-fluid">
    <h3>Movie : <?php echo $received_data['Title']; ?></h3>
    <hr>
	<div class="row">
		<div class="col-xs-6 col-md-4">
			<img class="" id="poster_image" src = <?php echo $received_data['Poster']; ?> >
			<br><br>
            <!-- paste here -->
            <form method="get" action="/views/add_movie_database.php" >
                <div class="input-group" style="width: 300px">
					<select id="screen_no" name="screen_no" class="form-control dropdown">
						<option value="" disabled selected>Select Screen</option>
						<?php
						for ($i=1;$i<=30;$i++) {
							echo "
                                       <option value=\"$i\">Screen #$i</option>
                            ";
						}
						?>
					</select>
					<select id="screen_no" name="screen_no" class="form-control dropdown-menu scrollable-menu">
						<option value="" disabled selected>Select Screen</option>
						<?php
						for ($i=1;$i<=10;$i++) {
							echo "
                                       <option value=\"$i\">Slot </option>
                            ";
						}
						?>
					</select>
				  <script>
					  $("#screen_no").change(function() {
						  if (this.value == "") {
							  $("#submit-screen-no").prop("disabled", true);
						  } else {
							  $("#submit-screen-no").prop("disabled", false);
						  }
					  });
				  </script>
				</div>
            </form>
        </div>
	<!--</div>-->
		<div  class="col-xs-12 col-md-8">
			<link rel="stylesheet" type="text/css" href="//cdn.traileraddict.com/css/rembed.css">
			<div class="embed-responsive embed-responsive-16by9"><!--"outer-embed-ta">class="embed-ta" -->
				<iframe class = "embed-responsive-item" width="100%" src="<?php echo $url_get_trailer; ?>" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
			</div>
            <br>
            <h2>Movie Details</h2>
            <hr>
		<div>
			<div class="col-xs-6 col-md-4">
				<h4> Title (Year) </h4>
			</div>
			<div class="col-xs-12 col-md-8">
				<h4> <?php echo $received_data['Title']."(".$received_data['Year'].")"; ?></h4>
			</div>
			<div class="col-xs-6 col-md-4">
				<h4> Plot </h4>
			</div>
			<div class="col-xs-12 col-md-8">
				<h4> <?php echo $received_data['Plot']; ?></h4>
			</div>
			<div class="col-xs-6 col-md-4">
				<h4> Release Date </h4>
			</div>
			<div class="col-xs-12 col-md-8">
				<h4> <?php echo $received_data['Released']; ?></h4>
			</div>
			<div class="col-xs-6 col-md-4">
				<h4> IMDB Rating </h4>
			</div>
			<div class="col-xs-12 col-md-8">
				<h4> <?php echo $received_data['imdbRating']; ?></h4>
			</div>
			<div class="col-xs-6 col-md-4">
				<h4> Genre </h4>
			</div>
			<div class="col-xs-12 col-md-8">
				<h4> <?php echo $received_data['Genre']; ?></h4>
			</div>
			<div class="col-xs-6 col-md-4">
				<h4> MPAA Rating </h4>
			</div>
			<div class="col-xs-12 col-md-8">
				<h4> <?php echo $received_data['Rated']; ?></h4>
			</div>
			<div class="col-xs-6 col-md-4">
				<h4> Runtime </h4>
			</div>
			<div class="col-xs-12 col-md-8">
				<h4> <?php echo $received_data['Runtime']; ?></h4>
			</div>
			<div class="col-xs-6 col-md-4">
				<h4> User Rating </h4>
			</div>
			<div class="col-xs-12 col-md-8">
				<div id="rateYo"></div>
				<script src="/js/jquery-2.1.1.js"></script>
				<script src="/js/jquery.rateyo.js"></script>
				<script type="text/javascript">
					$(function () {
						$("#rateYo").rateYo({
							readOnly: true,
							rating : <?php
							if( $received_data['tomatoUserRating'] != 'N/A') {
								echo $received_data['tomatoUserRating'];
							}
							else {
								echo '0';
							}
							?>
						});
					});
				</script>
			</div>
        </div>
	</div>
        <div class="col-xs-6 col-md-4">
        </div>
        <div>
            <div id="rotten_tomatoes_info" class="col-xs-12 col-md-8">
                <!--<div class="col-xs-6 col-md-4">
                    <h4>Aryan</h4>
                </div>-->
                <div class="col-xs-6 col-md-4">
                    <h5>TOMATOMETER</h5>
					<div>
						<img id="rating_image" src=<?php if($received_data['tomatoImage']=='N/A') {
							echo "/images/rt_".$received_data['tomatoImage'];
						}
						else {
							echo "/images/rt_".$received_data['tomatoImage'].".jpg";
						}?> >
						<span id="tomato_meter_percentage"><?php if($received_data['tomatoMeter'] == 'N/A') {
								echo $received_data['tomatoMeter'];
							}
							else {
								echo $received_data['tomatoMeter']."%";
							}?></span>
					</div>
					<br>
					<p>Average Rating:
						<?php echo ($received_data['tomatoRating'] == 'N/A' )?$received_data['tomatoRating'] : $received_data['tomatoRating']."%";?></p>
					<p>Reviews Counted: <?php echo $received_data['tomatoReviews'];?></p>
					<p>Fresh: <?php echo $received_data['tomatoFresh'];?></p>
					<p>Rotten: <?php echo $received_data['tomatoRotten'];?></p>
                </div>
				<div class="col-xs-6 col-md-4">
					<h5>Critics</h5>
					<?php
						$aria_valuenow = "";
						$width = "";
						if($received_data['tomatoMeter'] == 'N/A') {
							$aria_valuenow = 0;
						}
						else {
							$aria_valuenow = $received_data['tomatoMeter'];
						}
						if($received_data['tomatoMeter']=='N/A') {
							$width = "0%";
						}
						else {
							$width = $received_data['tomatoMeter']."%";
						}
					?>
					<br>
					<div class="progress">
						<div class="progress-bar" role="progressbar" style="width:0%;"></div>
						<div class="progress-bar" role="progressbar"
							 aria-valuenow= <?php echo $aria_valuenow; ?>
							 aria-valuemin="0" aria-valuemax="100"
							 style="width:<?php echo $width; ?> ">
						</div>
					</div>
					<p>Critics Consensus: <?php echo $received_data['tomatoConsensus']; ?></p>
				</div>
				<div class="col-xs-6 col-md-4">
					<h5>AUDIENCE SCORE</h5>
					<div>
						<img id="audience_rating_image" src=<?php
						if($received_data['tomatoUserMeter']!= 'N/A'){
							/*$int_val = (int)$received_data['tomatoUserRating'];
							echo $int_val;*/
							if($received_data['tomatoUserMeter'] > 60){
								echo "/images/rt_user_likes.jpg";
							}
							else {
								echo "/images/rt_user_dislike.jpg";
							}
						}
						?> >
						<span id="tomato_user_meter_percentage"><?php if($received_data['tomatoUserMeter'] == 'N/A') {
							echo $received_data['tomatoUserMeter'];
						}
						else {
							echo $received_data['tomatoUserMeter']."%";
						}?></span>
						<br>
						<br>
					</div>
					<p>Average Rating:
						<?php echo ($received_data['tomatoUserRating'] == 'N/A')?$received_data['tomatoUserRating']: $received_data['tomatoUserRating']."/5";?></p>
					<p>User Ratings:
						<?php echo ($received_data['tomatoUserReviews']=='N/A')?$received_data['tomatoUserReviews'] : number_format($received_data['tomatoUserReviews']); ?> </p>
				</div>
            </div>
        </div>
		</div>
</div>
</body>
</html>