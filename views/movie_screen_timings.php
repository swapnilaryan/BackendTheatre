<?php
session_start();
//include 'headers.php';

?>
<head xmlns="http://www.w3.org/1999/html">
    <!--<script src="/js/movie_screen_timings.js"></script>-->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
    <!-- Angular Material style sheet -->
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.css">
    <!-- Custom styles for this template -->
    <link href="https://getbootstrap.com/examples/sticky-footer/sticky-footer.css" rel="stylesheet">
    <link href="/styles/bootstrap-timepicker.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker.min.css" rel="stylesheet">
    <link href="/styles/movie_screen_timings.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/styles/style.css" type="text/css" media="all" />

</head>
<html>
<body ng-app="movie_theatre" ng-controller="movie_screen_timing" ng-cloak>
<div class="row">
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
    <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
        <?php include 'headers_test.php'; ?>
    </div>
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
</div>
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
        <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10">
            <form name="add_movie_screen_timing" method="post" action="movie_screen_timings_database.php">
                <table class="table table-bordered table-hover" id="tab_logic">
                    <thead>
                    <tr>
                        <th class="text-center" ng-repeat="header in tableHeaders">{{header}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                            <select ng-model="movie_name" ng-change="selected_movie(movie_name)" ng-options="movie_name as movie_name.movie_Title for movie_name in movie_details_data" class="form-control" id="MovieName">
                               <!-- <option disabled selected>Select</option>
                                <option class="scrollable-menu" ng-repeat="movie_name in movie_details_data">{{movie_name.movie_Title}}</option>-->
                            </select>
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="text" name='ScreenNo' placeholder='Screen No.' class="form-control"/>-->
                            <select class="form-control" id="ScreenNo"  ng-model="movie_name_selected_screen_no" ng-change="selected_screen_no(movie_name_selected_screen_no)">
                                <!--<option disabled selected>Select</option>-->
                                <option class="scrollable-menu" ng-repeat="screen_no in range(1,30)">{{screen_no}}</option>
                            </select>
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <div class="input-group bootstrap-timepicker timepicker" >
                                <input id="timepicker1" ng-model="movie_name_selected_start_time" ng-change="start_time(movie_name_selected_start_time)" class="form-control input-small" type="text">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>
                        </td>
                        <!--<script type="text/javascript">
                            // When the document is ready
                            $(document).ready(function () {
                                $('#timepicker1').timepicker();
                            });
                        </script>-->
                        <script>
                            /*$(document).ready(function () {
                                $('#timepicker1').timepicker().on('changeTime.timepicker', function(e) {
                                    console.log('The time is ' + e.time.value);
                                    console.log('The hour is ' + e.time.hours);
                                    console.log('The minute is ' + e.time.minutes);
                                    console.log('The meridian is ' + e.time.meridian);
                                });
                            });*/

                        </script>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="number" min="0" max="60" name='commercial_time' placeholder='In mins' ng-change="change_commercial_time(commercial_time)" ng-model="commercial_time" class="form-control"/>
                        -->
                            <select class="form-control" id="CommercialTime"  ng-change="change_commercial_time()" ng-model="commercial_time">
                                <!--<option disabled selected>Select</option>-->
                                <option class="scrollable-menu" ng-repeat="commercialTime in range_time(5,60)">{{commercialTime}}</option>
                            </select>
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="number" min="0" max="60" name='cleaning_time' placeholder="In mins" ng-change="change_cleaning_time(cleaning_time)" ng-model="cleaning_time" class="form-control"/>
                        -->
                            <select class="form-control" id="cleaningTime" ng-change="change_cleaning_time()" ng-model="cleaning_time">
                                <!--<option disabled selected>Select</option>-->
                                <option class="scrollable-menu" ng-repeat="cleaningTime in range_time(5,60)">{{cleaningTime}}</option>
                            </select>
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="text" name='Date' placeholder='Date' class="form-control"/>-->
                            <input class="datepicker" data-date-format="mm/dd/yyyy" type="text" placeholder="Pick Date" ng-model="selected_date" ng-change="change_date(selected_date)" id="date">
                             <script type="text/javascript">
                                // When the document is ready
                                /*$(document).ready(function () {
                                    $('#date').datepicker({
                                        format: "dd/mm/yyyy"
                                    });
                                });*/
                                $(document).ready(function () {
                                    $('.datepicker').datepicker({
                                        format: 'yyyy-mm-dd',
                                        startDate: '-3d'
                                    });
                                });
                            </script>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
                    <md-button class="md-raised md-primary" ng-click="send_to_db()" ng-disabled="add_to_screen_button()">Add to Screen</md-button>
                </section>
                </form>
        </div>
        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
    </div>
</div>
<hr>
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
        <div class="col-md-8 col-xs-8 col-lg-8 col-sm-8">
            <h3 align="center"> Now Showing </h3>
            <hr>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Screen No</th>
                        <th>Movie Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="now_showing in now_showing_data | filter: screen_no">
                        <td>{{now_showing.screen_no}}</td>
                        <td>{{now_showing.movie_name}}</td>
                        <td>{{now_showing.start_time}}</td>
                        <td>{{now_showing.end_time}}</td>
                        <td>{{now_showing.date}}</td>
                        <!--<td>
                            <button type="button" ng-click="removeItem(row)" class="btn btn-sm btn-danger">
                                <i class="glyphicon glyphicon-remove-circle">
                                </i>
                            </button>
                        </td>-->
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
    </div>
</div>

<!-- Modules -->
<script src="../js/app.js"></script>

<!-- Controllers -->
<script src="../js/controllers/movie_screen_timing.js"></script>

<!-- Angular Material requires Angular.js Libraries -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min.js"></script>
<!--Date Picker JS-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/js/bootstrap-datepicker.min.js"></script>
<script src="http://momentjs.com/downloads/moment.js"></script>
<!--Time Picker JS-->
<script src="/js/bootstrap-timepicker.js"></script>

<!-- Angular Material Library -->
<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>
<?php include "footers_test.php"; ?>
</body>
</html>
<?php

/*include "footers.php";

*/?>