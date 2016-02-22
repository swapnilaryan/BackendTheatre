app.controller("movie_screen_timing",['$scope', function($scope){
    $scope.name = "I am Swapnil";
    $scope.print = function(){
        $scope.newName = $scope.name;
    };

    $scope.tableHeaders = ['Movie Name','Screen No.','Start Time','End Time', 'Date'];

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

}]);