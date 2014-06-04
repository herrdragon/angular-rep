function Hello($scope, $http) {
	$scope.userAddress = document.getElementById("userAddress").value;
      $scope.getAddress = function(){
$http.post('https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?key=AIzaSyCN9rkEJ848kuw9-YO7vZ41Mt7v2bhckcs'
               , {$scope.userAddress }).
        success(function(data) {
            $scope.greeting = data;
        });
};  
}



// function getAddress () {
// 	$scope.address= alert("hi");
//     $scope.userAddress = document.getElementById("userAddress").value;'address': '1205 Mariposa Ave Miami FL'
// };