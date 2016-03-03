<?php
session_start();
include 'headers.php';
include './../getImage.php';
include './../RottenTomatoesInfo.php';
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
	<script src="/js/jquery.rateyo.js"></script>
	<link rel="stylesheet" href="/js/jquery.rateyo.css"/>
	<link rel="stylesheet" href="/styles/movie_add_to_screen.css">
</head>
<?php
$received_data = $_GET['arg'];
if ($_GET['arg'] != null) {
	$received_data = $_GET['arg'];
	$received_data = urldecode($received_data);
	$received_data = json_decode($received_data,true);
    // Fetch the trailer of the movie here from youtube list
    $get_trailer = rawurlencode($received_data['Title']);
    $url_get_trailer = 'https://www.youtube.com/embed?listType=search&list='.$get_trailer.'+Trailer';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL,$url_get_trailer);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/xml'));
    $content = curl_exec($ch);
	$received_data['Trailer'] = $url_get_trailer;
    /*$_SESSION['received_data']=$received_data;*/
} else {
    echo 'Fail'; // Redirect to no results found page
    die();
}
/*Evaluate the crawl data from Rotten Tomatoes*/
$get_date = $received_data['Released'];
$released_date = date('Y/m/d', strtotime($get_date));
$todays_date = date("Y/m/d");
if($received_data['tomatoURL']!='N/A' && $todays_date > $released_date) {
    $rottenTomatoes_obj = new RottenTomatoesInfo($received_data['tomatoURL']);
    /*For all critics*/
    $rt_allCritics = $rottenTomatoes_obj->all_critics();
    $received_data['tomatoMeter'] = $rt_allCritics['Percentage'];
    $received_data['tomatoRating'] = $rt_allCritics['Average_Rating'];
    $received_data['tomatoReviews'] = $rt_allCritics['Reviews_Counted'];
    $received_data['tomatoFresh'] = $rt_allCritics['Fresh'];
    $received_data['tomatoRotten'] = $rt_allCritics['Rotten'];
    /*End for all critics*/

    /*For top critics*/
    $rt_topCritics = $rottenTomatoes_obj->top_critics();
    $topCritics['Reviews_Counted'] = $rt_topCritics['Reviews_Counted'];
    /*End for top critics*/

    /*For Audience*/
    $rt_audience = $rottenTomatoes_obj->audience();
    //tomatoUserMeter;tomatoUserRating;tomatoUserRating
    $received_data['tomatoUserMeter'] = $rt_audience['User_Percentage'];
    $received_data['tomatoUserRating'] = ($rt_audience['Average_Rating'])?($rt_audience['Average_Rating']):('N/A');
    $received_data['tomatoUserReviews'] = $rt_audience['User_Ratings'];
    /*End for Audience*/

    /*End Tomato Consensus*/
    $rt_consensus = $rottenTomatoes_obj->consensus();
    $received_data['tomatoConsensus'] = $rt_consensus['Consensus'];
    /*End Tomato Consensus*/

    /*Check for image if certified or fresh or rotten*///str_replace
    if($received_data['tomatoImage']=='N/A'){
        if((int)$rt_allCritics['Percentage']>=75){
            if($topCritics['Reviews_Counted']>5 && ($topCritics['Reviews_Counted'] + $rt_allCritics['Reviews_Counted'])>= 40 ) {
                $received_data['tomatoImage'] = 'certified';
            }
            else {
                $received_data['tomatoImage'] = 'fresh';
            }
        }
        elseif ((int)$rt_allCritics['Percentage']<75 && (int)$rt_allCritics['Percentage']>= 60) {
            if($topCritics['Reviews_Counted']>5 && ($topCritics['Reviews_Counted'] + $rt_allCritics['Reviews_Counted'])>= 40 ) {
                $received_data['tomatoImage'] = 'certified';
            }
            else {
                $received_data['tomatoImage'] = 'rotten';
            }
        }else {
            $received_data['tomatoImage'] = 'rotten';
        }

    }
    /*end Check for image if certified or fresh or rotten*/
    $_SESSION['received_data'] = $received_data;
}
else {
    $_SESSION['received_data'] = $received_data;
}
?>


<body>
<div id="movie_add_to_screen" class="container-fluid">
    <h3>Movie : <?php echo $received_data['Title']; ?></h3>
    <hr>
	<div class="row">
        <div class="col-xs-1 col-md-1 col-lg-1 col-sm-1"></div>
		<div class="col-xs-3 col-md-3 col-lg-3 col-sm-3">
			<img class="img-responsive" id="poster_image" src="<?php
																	if($received_data['Poster']=='N/A') {
																		echo "/images/image_not_found.jpg";
																	}
																	else
																		echo  data_uri($received_data['Poster'],'image/png'); ?>">
			<br><br>
            <!-- paste here -->
            <form method="get" action="/views/add_movie_database.php" >
                <div class="input-group" style="width: 300px">
					<input type="submit" class="btn btn-default" name="addToDB" value="Click to Add to Screen">
				</div>
            </form>
        </div>
	<!--</div>-->
		<div  class="col-xs-7 col-md-7">
			<link rel="stylesheet" type="text/css" href="//cdn.traileraddict.com/css/rembed.css">
            <div class="embed-responsive embed-responsive-16by9">
				<iframe class = "embed-responsive-item"  src="<?php echo $url_get_trailer; ?>" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
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
			</div>
        </div>
	</div>
        <div class="container-fluid">
            <div class="col-xs-4 col-md-4 col-lg-4 col-sm-4"></div>
            <div id="rotten_tomatoes_info" class="col-xs-7 col-md-7">
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
                        <?php echo ($received_data['tomatoRating'] == 'N/A' )?$received_data['tomatoRating'] : $received_data['tomatoRating'];?></p>
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
                        <?php echo ($received_data['tomatoUserRating'] == 'N/A')?$received_data['tomatoUserRating']: $received_data['tomatoUserRating'];?></p>
                    <p>User Ratings:
                        <?php echo ($received_data['tomatoUserRating']=='N/A')?$received_data['tomatoUserReviews'] : $received_data['tomatoUserReviews']; ?> </p>
                </div>
            </div>
        </div>
        <div class="col-xs-1 col-md-1 col-lg-1 col-sm-1"></div>
    </div>
</div>
<script type="text/javascript">
    /*$.(document).ready(function () {
        $('#rateYo').RateYo({
            readOnly: true,
            rating : 3.6
        });
    });*/
    $("#rateYo").rateYo({
        onSet: function (rating, rateYoInstance) {
            $(this).next().val(rating);
        },
        readOnly: true,
        rating : 3.6,
        starWidth: "20px",
        numStars: 5,
        fullStar: true
    });
</script>
</body>
</html>
<?php
include "footers.php";
?>