app.controller("movie_screen_timing",['$scope','$http','$compile', function($scope,$http,$compile){
    $scope.tableHeaders = ['Movie Name','Duration','Screen No.','Start Time','End Time', 'Date'];
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

    // fetch movie details from database
    $scope.movie_name_selected_duration=null;
    $scope.movie_name_selected=null;
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
    $scope.movie_name_selected_screen_no=null;
    $scope.selected_screen_no = function selected_screen_no (movie_name_selected_screen_no){
        $scope.movie_name_selected_screen_no = movie_name_selected_screen_no;
        console.log($scope.movie_name_selected_screen_no);
    };
    // end selecting screen

    //start time
    $scope.movie_name_selected_start_time=null;
    $scope.start_time = function start_time(start_time){
        $scope.movie_name_selected_start_time = start_time;
        console.log('--------------------------------------',$scope.movie_name_selected_start_time);
    };
    //end start time

    //end time
    $scope.movie_name_selected_end_time=null;
    $scope.end_time = function end_time(end_time){
        $scope.movie_name_selected_end_time = end_time;
        console.log('**********************************',$scope.movie_name_selected_end_time);
    };
    //end end time

    //Date change change_date(selected_date)
    $scope.movie_selected_date='';
    $scope.change_date  = function change_date(selected_date){
        $scope.movie_selected_date = selected_date;
        console.log(selected_date,'**********************************',$scope.movie_selected_date);
    };
    //end date time

    //Enable/ Disable Add to screen Button $scope.movie_name_selected!=null && $scope.movie_name_selected_duration !=null && $scope.movie_name_selected_screen_no != null && $scope.movie_name_selected_start_time!=null && $scope.movie_name_selected_end_time != null &&
    $scope.add_to_screen_button_enable=true;
    $scope.add_to_screen_button = function add_to_screen_button(){
        if($scope.movie_name_selected!=null && $scope.movie_name_selected_duration !=null && $scope.movie_name_selected_screen_no != null && $scope.movie_name_selected_start_time!=null && $scope.movie_name_selected_end_time != null && $scope.movie_selected_date != ''){
            $scope.add_to_screen_button_enable = false;
            return false;
        }
        else {
            $scope.add_to_screen_button_enable = true;
            return true;
        }
    };
    //end enable/disable add to screen button

    //Bind Data to be send to server

    //End Binding

    /**************************************NOW SHOWING PART*******************************/

    /************************************End NOW SHOWING PART*****************************/
}]);