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
<!--<div>
    <p>Input something in the input box:</p>
    <p>Name : <input type="text" ng-model="name" placeholder="Enter name here"></p>
    <h1>Hello {{name}}</h1>
    <input type="button" ng-click="print()" value="Print your name">
    <p>Saved name is : {{newName}}</p>

</div>-->
<h3 align="center"> Movie Screen Timings </h3>
<hr>
<div class="container-fluid">
    <div class="row clearfix">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
        <div class="col-md-8 col-xs-8 col-lg-8 col-sm-8">
            <form method="POST" action='' name="frmAddProd">
                <table class="table table-bordered table-hover" id="tab_logic">
                    <thead>
                    <tr>
                        <th class="text-center" ng-repeat="header in tableHeaders">{{header}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input type="text" name='movie'  placeholder='Movie' class="form-control"/>
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="text" name='ScreenNo' placeholder='Screen No.' class="form-control"/>-->
                            <select class="form-control" id="ScreenNo">
                                <option disabled selected>Select</option>
                                <option class="scrollable-menu" ng-repeat="n in range(1,30)">Screen# {{n}}</option>
                            </select>
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input id="timepicker1" class="form-control input-small" type="text">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>

                            <!--<input type="text" name='StartTime' placeholder='Start Time' class="form-control"/>-->
                        </td>
                        <td class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <!--<input type="text" name='EndTime' placeholder='End Time' class="form-control"/>-->
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input id="timepicker2" class="form-control input-small" type="text">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>

                        </td>
                        <script type="text/javascript">
                            // When the document is ready
                            $(document).ready(function () {
                                $('#timepicker1').timepicker();
                                $('#timepicker2').timepicker();
                            });
                        </script>
                        <td>
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
                </form>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
    </div>
</div>
<section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
    <md-button class="md-raised md-primary">Add to Screen</md-button>
</section>

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