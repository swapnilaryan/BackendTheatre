<?php
session_start();
include 'headers.php';
?>
<head xmlns="http://www.w3.org/1999/html">
    <!--<script src="/js/movie_screen_timings.js"></script>-->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
    <!-- Angular Material style sheet -->
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.css">
    <!-- Custom styles for this template -->
    <link href="https://getbootstrap.com/examples/sticky-footer/sticky-footer.css" rel="stylesheet">
    <link href="/styles/datepicker.css" rel="stylesheet">
    <link href="/styles/bootstrap-timepicker.css" rel="stylesheet">
    <link href="/styles/movie_screen_timings.css" rel="stylesheet">

</head>
<html>
<body ng-app="movie_theatre" ng-controller="movie_screen_timing" ng-cloak>
<h3 align="center"> Movie Screen Timings </h3>
<hr>
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
        <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10">
            <form name="add_movie_screen_timing">
                <table class="table table-bordered table-hover" id="tab_logic">
                    <thead>
                    <tr>
                        <th class="text-center" ng-repeat="header in tableHeaders">{{header}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <select ng-model="movie_name" ng-change="selected_movie(movie_name)" ng-options="movie_name as movie_name.movie_Title for movie_name in movie_details_data" class="form-control" id="MovieName">
                               <!-- <option disabled selected>Select</option>
                                <option class="scrollable-menu" ng-repeat="movie_name in movie_details_data">{{movie_name.movie_Title}}</option>-->
                            </select>
                        </td>
                        <td class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                            <input type="text" ng-model="movie_name_selected_duration" class="form-control">
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="text" name='ScreenNo' placeholder='Screen No.' class="form-control"/>-->
                            <select class="form-control" id="ScreenNo"  ng-model="movie_name_selected_screen_no">
                                <option disabled selected>Select</option>
                                <option class="scrollable-menu" ng-repeat="screen_no in range(1,30)">{{screen_no}}</option>
                            </select>
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <div class="input-group bootstrap-timepicker timepicker"  ng-model="movie_name_selected_start_time">
                                <input id="timepicker1" class="form-control input-small" type="text">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>

                            <input type="text" name='StartTime' ng-model="movie_name_selected_start_time" placeholder='Start Time' class="form-control"/>
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="text" name='EndTime' placeholder='End Time' class="form-control"/>-->
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input id="timepicker2" ng-model="movie_name_selected_end_time" ng-change="end_time()" class="form-control input-small" type="text">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>

                        </td>
                        <!--<script type="text/javascript">
                            $scope.movie_name_selected_start_time=null;
                            // When the document is ready
                            $(document).ready(function () {
                                $scope.movie_name_selected_start_time = $('#timepicker1').timepicker();
                                $('#timepicker2').timepicker();
                                console.log($scope.movie_name_selected_start_time);
                            });
                        </script>-->
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="text" name='Date' placeholder='Date' class="form-control"/>-->
                            <input type="text" placeholder="Pick Date" class="form-control" id="example1">
                            <script type="text/javascript">
                                // When the document is ready
                                $(document).ready(function () {

                                    $('#example1').datepicker({
                                        format: "dd/mm/yyyy"
                                    });

                                });
                            </script>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
                    <md-button class="md-raised md-primary" ng-disabled="add_to_screen_button_enable">Add to Screen</md-button>
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Anna</td>
                        <td>Pitt</td>
                        <td>35</td>
                        <td>New York</td>
                        <td>
                            <button type="button" ng-click="removeItem(row)" class="btn btn-sm btn-danger">
                                <i class="glyphicon glyphicon-remove-circle">
                                </i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>QWE</td>
                        <td>PitFDSt</td>
                        <td>135</td>
                        <td>INDIA York</td>
                        <td>
                            <button type="button" ng-click="removeItem(row)" class="btn btn-sm btn-danger">
                                <i class="glyphicon glyphicon-remove-circle">
                                </i>
                            </button>
                        </td>
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
<script src="/js/bootstrap-datepicker.js"></script>

<!--Time Picker JS-->
<script src="/js/bootstrap-timepicker.js"></script>

<!-- Angular Material Library -->
<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>

</body>
</html>
<?php
/*include "footers.php";
*/?>