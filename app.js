function Hello($scope, $http) {
	var state = 'FL';
  $scope.getAddress = function() {
    $scope.userAddress = document.getElementById("userAddress").value;
		$http.post('https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?key=AIzaSyCN9rkEJ848kuw9-YO7vZ41Mt7v2bhckcs'
        	,{'address': $scope.userAddress+' '+state}).
        		success(function(data) {
            	$scope.greeting = data;
        });
};
};