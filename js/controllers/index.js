var app = angular.module('movie_theatre',[]);
app.controller("index",['$scope','$http', function($scope,$http){
    //fetch all data for now showing
    var url = "views/now_showing.php?screen_no=";
    //$http.get("views/now_showing.php").success(
    $http.get(url).success(
        function (data) {
            $scope.now_showing_data = data;
            $scope.slide_movies = $scope.now_showing_data.slice(0, 4);
            console.log("**********************",$scope.now_showing_data);
        }
    );
    //end fetch data for now showing

    //start movie slider
    $scope.slide_index = 0;
    $scope.slide_left = function slide_left(){
        if (($scope.slide_index) - 4 <= 0) {
            $scope.slide_index = 0;
            $scope.slide_movies = $scope.now_showing_data.slice(0, 4);
        }
        else {
            $scope.slide_index -= 4;
            $scope.slide_movies = $scope.now_showing_data.slice($scope.slide_index,$scope.slide_index + 4);
        }
    };
    $scope.slide_right = function slide_right(){
        if($scope.slide_index + 4 >= $scope.now_showing_data.length){
        }
        else {
            $scope.slide_index = $scope.slide_index + 4;
            $scope.slide_movies = $scope.now_showing_data.slice($scope.slide_index,$scope.slide_index + 4);
        }

        console.log("----after slice",$scope.now_showing_data);
    };
    //$scope.slide_left();
    //end movie slider

    // for displaying the number of screens
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    // end displaying the no. of screens

    //select a screen
    $scope.movie_name_selected_screen_no=null;
    $scope.selected_screen_no = function selected_screen_no (movie_name_selected_screen_no){
        $scope.movie_name_selected_screen_no = movie_name_selected_screen_no;
        //Display movies by screen no
        $scope.screen_no_movie = null;
        var url = "views/now_showing.php?screen_no="+$scope.movie_name_selected_screen_no;
        console.log(url);
        $http.get(url).success(
            function (data) {
                $scope.screen_no_movie = data;
                console.log("**********************",$scope.screen_no_movie);
            }
        );
        //End display movies by screen no
    };
    // end selecting screen

}]);