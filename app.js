(function () {
    // you could do something like
    // angular.module('RepMiami', []);
    //        .controller('MainCtrl', ['$scope', function($scope){}]);
    // or 
    var repmiami = angular.module('RepMiami', []);
    repmiami.controller('MainCtrl', ['$scope', function($scope){}]);



    function callApi($scope, $http) {
      $scope.getAddress = function() {
        $scope.userAddress = document.getElementById("userAddress").value;
        $scope.city = document.getElementById("city").value;
        $scope.state = "FL";
            $http.post('https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?key=AIzaSyCN9rkEJ848kuw9-YO7vZ41Mt7v2bhckcs'
                ,{'address': $scope.userAddress+' '+$scope.city+' '+$scope.state}).success(function(data) {
                    $scope.greeting = data;
                    $scope.result = true;
            });
        };

            $scope.geolocateUser = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = (position.coords.latitude, position.coords.longitude);
                    writeAddressName(pos); //comment this line to stop the page from reload when debugging 
                });
            } 
            else  {
                alert('Error: The Geolocation service failed.');
            }
            };

            $scope.writeAddressName = function(latLng){
            var geocoder = new google.maps.Geocoder();
            console.log(gepcoder);
            geocoder.geocode({
              "location": latLng
            }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK){
                var field = results[0];
                var component = field.address_components;
                var len = component.length;
                var addr = 'error';
                for ( var i = 0; i < len; ++i ) {
                    if (component[i].long_name === 'Miami-Dade County') {
                        addr = field.formatted_address;
                        alert(addr);
                        break;
                    }
                }
                getAddress(addr);
            } 
            else  
                alert('Location search was unsuccesful. Error : ' + status);
        });
        };
    };
})();

