app.controller("movie_screen_timing",['$scope','$http','$compile', function($scope,$http,$compile){
    $scope.tableHeaders = ['Movie Name','Duration','Screen No.','Start Time','End Time', 'Date'];
    $scope.movie_name_selected=null;
    $scope.movie_name_selected_duration=null;
    $scope.movie_name_selected_screen_no=null;
    $scope.movie_name_selected_start_time=null;
    // When the document is ready
    $(document).ready(function () {
        $scope.movie_name_selected_start_time = $('#timepicker1').timepicker();
        $compile($('.TimePickers'))($scope);
        $('#timepicker2').timepicker();
        console.log($scope.movie_name_selected_start_time);
    });
    /*$scope.movie_name_selected_start_time=null;
    $scope.movie_name_selected_end_time=null;*/
    $scope.movie_name_selected_date=null;
    $scope.add_to_screen_button_enable=true;
    // for displaying the number of screens
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push("Screen# "+i);
        }
        return input;
    };
    // end displaying the no. of screens
    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        /*var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }*/
        console.log("Will remove later");
    };
    //end remove button
    // fetch movie details from database $scope.movie_details =
    $http.get("fetch_data_for_display%20page.php")
        .success(function (data) {
            $scope.movie_details_data = data;
            console.log($scope.movie_details_data);
        });
    $scope.selected_movie = function selected_movie(movie_name) {
        $scope.movie_name_selected = movie_name;
        $scope.movie_name_selected_duration = $scope.movie_name_selected.movie_Runtime;
        console.log('**************',$scope.movie_name);
    };
    //end fetching movie details from database

    //select a screen
    $scope.selected_screen_no = function selected_screen_no (movie_name_selected_screen_no){
        $scope.movie_name_selected_screen_no = movie_name_selected_screen_no;
        console.log($scope.movie_name_selected_screen_no);
    };
    // end selecting screen

    //start time
    $scope.start_time = function start_time(start_time){
        $scope.movie_name_selected_start_time = start_time;
        console.log('--------------------------------------');
    };
    //end start time

    //end time
    $scope.end_time = function end_time(end_time){
        $scope.movie_name_selected_end_time = end_time;
        console.log('**********************************');
    };
    //end end time

}]);