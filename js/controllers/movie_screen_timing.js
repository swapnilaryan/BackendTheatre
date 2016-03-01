app.controller("movie_screen_timing",['$scope','$http','$compile', function($scope,$http,$compile){
    $scope.tableHeaders = ['Movie Name','Screen No.','Start Time','Commercial Time','Cleaning Time', 'Date'];
    $(document).ready(function () {
        $('#timepicker1').timepicker();
    });
    //start time
    $scope.movie_name_selected_start_time=null;
    $scope.movie_name_selected_end_time=null;
    $scope.start_time = function start_time(start_time){
 //       $(document).ready(function () {
            $('#timepicker1').timepicker().on('changeTime.timepicker', function(e) {
                $scope.movie_name_selected_start_time = e.time.value;
                $scope.start_time_hours = e.time.hours;
                $scope.start_time_minute = e.time.minutes;
                /*console.log('The time is ' + e.time.value);
                console.log('The hour is ' + e.time.hours);
                console.log('The minute is ' + e.time.minutes);
                console.log('The meridian is ' + e.time.meridian);*/
            });
        //});
        //$scope.movie_name_selected_start_time = start_time;
        $scope.movie_name_selected_end_time =  $scope.movie_name_selected_end_time +$scope.movie_name_selected_start_time;
        console.log('--------------------------------------',$scope.movie_name_selected_start_time);
        console.log('/////////////////////////////////',$scope.movie_name_selected_end_time);
    };
    //end start time

    $scope.commercial_time = null;
    $scope.cleaning_time = null;
    //commercial time change
    $scope.change_commercial_time = function change_commercial_time(commercial_time) {
        $scope.commercial_time = commercial_time;
        $scope.movie_name_selected_end_time = $scope.movie_name_selected_end_time + $scope.start_time_minute+$scope.commercial_time;
        console.log('**************************************************',$scope.movie_name_selected_end_time);
    };
    //end commercial time change
    // start cleaning time change
    $scope.change_cleaning_time = function change_cleaning_time(cleaning_time) {
        $scope.cleaning_time = cleaning_time;
        $scope.movie_name_selected_end_time = $scope.movie_name_selected_end_time + $scope.start_time_minute+$scope.cleaning_time;
        console.log('-----------------++++++++++++++++++++++++',$scope.movie_name_selected_end_time,'--');
    };
    //end cleaning time change

    //end time need to do
    //$scope.movie_name_selected_end_time=null;
    $scope.end_time = function end_time(end_time){
        /*
         * $scope.movie_name_selected_start_time
         * $scope.change_commercial_time
         * $scope.change_cleaning_time
         * $scope.movie_name_selected_duration*/
        console.log();
        $scope.movie_name_selected_end_time = end_time;
        console.log('**********************************',$scope.movie_name_selected_end_time);
    };
    //end end time

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
        $scope.movie_name_selected_movie_Title = $scope.movie_name_selected.movie_Title;
        $scope.movie_name_selected_imdbId = $scope.movie_name_selected.movie_imdbId;
        $scope.movie_name_selected_duration = $scope.movie_name_selected.movie_Runtime;
        console.log('**************',$scope.movie_name,$scope.movie_name_selected_imdbId);
    };
    //end fetching movie details from database

    //select a screen
    $scope.movie_name_selected_screen_no=null;
    $scope.selected_screen_no = function selected_screen_no (movie_name_selected_screen_no){
        $scope.movie_name_selected_screen_no = movie_name_selected_screen_no;
        console.log($scope.movie_name_selected_screen_no);
    };
    // end selecting screen

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
    $scope.data_bind_add_to_screen = {};
    $scope.data_bind_add_to_screen['movie_name']=null;
    $scope.data_bind_add_to_screen['screen_no']=null;
    $scope.data_bind_add_to_screen['movie_imdbId']=null;
    $scope.data_bind_add_to_screen['start_time']=null;
    $scope.data_bind_add_to_screen['end_time']=null;
    $scope.data_bind_add_to_screen['date']=null;

    $scope.send_to_db = function send_to_db() {
        $scope.data_bind_add_to_screen['movie_name']=$scope.movie_name_selected_movie_Title;
        $scope.data_bind_add_to_screen['screen_no']=$scope.movie_name_selected_screen_no;
        $scope.data_bind_add_to_screen['movie_imdbId']=$scope.movie_name_selected_imdbId;
        $scope.data_bind_add_to_screen['start_time']=$scope.movie_name_selected_start_time;
        $scope.data_bind_add_to_screen['end_time']=$scope.movie_name_selected_end_time;
        $scope.data_bind_add_to_screen['date']=$scope.movie_selected_date;
        $http.get('movie_screen_timings_database.php')
            .success(function (data) {
                $scope.movie_details_data = data;
                console.log($scope.movie_details_data);
            });
    };

    //End Binding

    /**************************************NOW SHOWING PART*******************************/
    
    /************************************End NOW SHOWING PART*****************************/
}]);