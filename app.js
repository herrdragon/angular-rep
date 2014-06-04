function Hello($scope, $http) {
  $scope.getAddress = function() {
    $scope.userAddress = document.getElementById("userAddress").value;
    $scope.city = document.getElementById("city").value;
    $scope.state = document.getElementById("state").value;
		$http.post('https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?key=AIzaSyCN9rkEJ848kuw9-YO7vZ41Mt7v2bhckcs'
        	,{'address': $scope.userAddress+' '+$scope.city+' '+$scope.state}).
        		success(function(data) {
            	$scope.greeting = data;
        });
};
};