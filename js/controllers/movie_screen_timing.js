app.controller("movie_screen_timing",['$scope','$http','$compile', function($scope,$http,$compile){
    $scope.tableHeaders = ['Movie Name','Screen No.','Start Time','Commercial Time','Cleaning Time', 'Date'];
    $(document).ready(function () {
        $('#timepicker1').timepicker();
    });
    //start time
    $scope.movie_name_selected_start_time=null;
    $scope.movie_name_selected_end_time=0;
    $scope.start_time = function start_time(start_time){
            $('#timepicker1').timepicker().on('changeTime.timepicker', function(e) {
                $scope.movie_name_selected_start_time = e.time.value;
                $scope.start_time_minute = e.time.minutes;
                /*console.log('The time is ' + e.time.value);
                console.log('The hour is ' + e.time.hours);
                console.log('The minute is ' + e.time.minutes);
                console.log('The meridian is ' + e.time.meridian);*/
            });
        $scope.end_time_cal = parseInt($scope.commercial_time)+ parseInt($scope.cleaning_time) + parseInt($scope.movie_name_selected_duration);
        $scope.movie_name_selected_end_time = moment($scope.movie_name_selected_start_time, 'h:mm A').add($scope.end_time_cal, 'minutes').format('h:mm A');
        //$scope.change_commercial_time();
        console.log("********end time **********",$scope.movie_name_selected_end_time);
    };
    //end start time

    $scope.commercial_time = 0;
    $scope.cleaning_time = 0;

    // for displaying the commercial time and cleaning time
    $scope.range_time = function(min, max, step) {
        step = step || 5;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    // end displaying the no. of screens

    //commercial time change
    $scope.change_commercial_time = function change_commercial_time() {
        $scope.start_time_minute = parseInt($scope.start_time_minute) + parseInt($scope.commercial_time) + parseInt($scope.movie_name_selected_duration);
        $scope.movie_name_selected_end_time = moment($scope.movie_name_selected_start_time, 'h:mm A').add($scope.start_time_minute, 'minutes').format('h:mm A');
        console.log("********end time **********",$scope.movie_name_selected_end_time);
    };
    //end commercial time change

    // start cleaning time change
    $scope.change_cleaning_time = function change_cleaning_time() {
        $scope.start_time_minute = parseInt($scope.start_time_minute) + parseInt($scope.cleaning_time);
        $scope.movie_name_selected_end_time = moment($scope.movie_name_selected_start_time, 'h:mm A').add($scope.start_time_minute, 'minutes').format('h:mm A');
        console.log("********end time **********",$scope.movie_name_selected_end_time);
    };
    //end cleaning time change

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
        console.log($scope.movie_name_selected_movie_Title);
        $scope.movie_name_selected_imdbId = $scope.movie_name_selected.movie_imdbId;
        console.log($scope.movie_name_selected_imdbId);
        $scope.movie_name_selected_duration = $scope.movie_name_selected.movie_Runtime;
        if($scope.movie_name_selected_duration=='N/A'){
            $scope.movie_name_selected_duration = 0;
        }else {
            var split_time = $scope.movie_name_selected_duration.split(" ");
            $scope.movie_name_selected_duration = split_time[0];
        }
        console.log($scope.movie_name_selected_duration);
        console.log('------------------------',$scope.movie_name_selected.movie_Title);
        console.log('**************',$scope.movie_name,$scope.movie_name_selected_imdbId,$scope.movie_name_selected_duration);
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
        console.log($scope.data_bind_add_to_screen);
        //may be a check is required---------TO DO
        $http({
            method  : 'POST',
            url     : 'movie_screen_timings_database.php',
            data    : $scope.data_bind_add_to_screen // pass in data as strings
        }).success(function (data) {
                /*$scope.received_data_for_now_showing = data;
                $scope.now_showing($scope.received_data_for_now_showing);*/
                $scope.now_showing();
                console.log(data);
            });
    };
    //End Binding

    /**************************************NOW SHOWING PART*******************************/
    $scope.now_showing_data = [];

    $scope.now_showing_data['screen_no'] = null;
    $scope.now_showing_data['movie_name'] = null;
    $scope.now_showing_data['start_time'] = null;
    $scope.now_showing_data['end_time'] = null;
    $scope.now_showing_data['movie_imdbId'] = null;
    $scope.now_showing_data['date'] = null;
    $scope.now_showing = function now_showing(){
        $http({
            method  : 'GET',
            url     : 'movie_screen_timings_database.php'
        }).success(function (data) {
            $scope.received_data_for_now_showing = data;
            $scope.now_showing_data = data;
            console.log("||||||||||||||||||||||||||||||||||||||||||||||",$scope.received_data_for_now_showing);
            /*for(var i =0;i<$scope.received_data_for_now_showing.length;i++){
                var x = {};
                x['screen_no'] = $scope.received_data_for_now_showing[i]['screen_no'];
                x['movie_name'] = $scope.received_data_for_now_showing[i]['movie_name'];
                x['start_time'] = $scope.received_data_for_now_showing[i]['start_time'];
                x['end_time'] = $scope.received_data_for_now_showing[i]['end_time'];
                x['movie_imdbId'] = $scope.received_data_for_now_showing[i]['movie_imdbId'];
                x['date'] = $scope.received_data_for_now_showing[i]['date'];
                $scope.now_showing_data.push(x);
            }*/
            console.log("===========================",$scope.now_showing_data);
        });

    };
    $scope.now_showing();
    /************************************End NOW SHOWING PART*****************************/
}]);