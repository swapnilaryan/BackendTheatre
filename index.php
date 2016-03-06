<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="styles/style.css" type="text/css" media="all" />
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="js/controllers/index.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">

</head>
<body ng-app="movie_theatre" ng-controller="index" ng-cloak >
<div class="row">
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
    <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
        <?php include 'views/headers_test.php'; ?>
        <div class="row">
            <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
            <!-- Main -->
            <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
                <div id="main">
                    <br><br>
                    <!-- Content -->
                    <div id="content">
                        <!-- Box -->
                        <div class="row-fluid">
                            <div style="width: auto; margin-right: 60px; margin-top: 70px;" class="col-xs-1 col-md-1 col-lg-1 col-sm-1" ><span><a ng-click="slide_left()"><h1><i class="fa fa-chevron-left"></i></h1></a></span></div>
                            <div class="movie-image col-md-10 col-sm-10 col-lg-10 col-xs-10" ng-repeat="img in slide_movies">
                                <a href="#"><img  ng-src="{{img.movie_Poster}}" alt="movie" /></a>
                                <br/>
                                <h5>{{img.movie_Title}}  ({{img.movie_Year}})</h5>
                            </div>
                            <!--                    <div class="col-xs-1 col-md-1 col-lg-1 col-sm-1"></div>-->
                            <div style=" width: auto; margin-left: 60px; margin-top: 70px;" class="col-xs-1 col-md-1 col-lg-1 col-sm-1"><span><a ng-click="slide_right()"><h1><i class="fa fa-chevron-right"></i></h1></a></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
        </div>
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
                <div class="container">
                    <div id="text_screen_wise_listing" class="col-xs-2 col-md-2 col-lg-2 col-sm-2"><h4>SCREEN WISE LISTING</h4></div>
                    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2">
                        <label for="Screen_no"></label>
                        <select class="form-control" id="Screen_no" ng-model="movie_name_selected_screen_no" ng-change="selected_screen_no(movie_name_selected_screen_no)">
                            <!--<option disabled selected>Select</option>-->
                            <option value="" disabled selected>Select Screen No</option>
                            <option class="scrollable-menu" ng-repeat="screen_no in range(1,30)">{{screen_no}}</option>
                        </select>
                        <label for="Screen_no"></label>
                    </div>
                </div>

                <div class="container">
                    <div class="movie-image col-md-6 col-sm-6 col-lg-6 col-xs-6" ng-repeat="img in screen_no_movie">
                        <a href="#"><img ng-src="{{img.movie_Poster}}" alt="movie" /></a>
                        <br/>
                        <h5>{{img.movie_Title}}  ({{img.movie_Year}})</h5>
                    </div>
                </div>

            </div>
            <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
        </div>
    </div>
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
</div>

<?php include 'views/footers_test.php'?>
</body>

</html>
<?php
//include 'views/footers.php';
?>