var repmiami = angular.module('RepMiami', []);

repmiami.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.position = {};
    $scope.userAddress = 'Please enter your address';
    $scope.city = '';
    $scope.hideCity = false;
    $scope.geolocateUser = function geolocateUser () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('POSITION: ', position);
                $scope.position = {
                    'lat': position.coords.latitude, 
                    'lng': position.coords.longitude
                };

                // TODO: move this to service
                var geocoder = new google.maps.Geocoder();
                console.log('GEOCODER: ', geocoder);

                geocoder.geocode({ "location": $scope.position }, function (results, status) {
                    console.log('RESULT: ', results);
                    // console.log('STATUS: ', status); // 'OK'
                    // console.log('GSTATUS: ', google.maps.GeocoderStatus.OK); // 'OK'
                    if (status === google.maps.GeocoderStatus.OK) {
                        $scope.results = results[0];
                        $scope.city = results[0].address_components[2].long_name;
                        //$scope.$apply();

                        var component = $scope.results.address_components;
                        var check = {};
                        angular.forEach($scope.results.address_components, function(val, key) {
                            console.log(key+') '+val.long_name);
                            if (val.long_name === 'Miami-Dade County') {
                                $scope.userAddress = $scope.results.formatted_address;
                                this.found = true;
                            };
                        }, check);

                        if (!check.found) {
                            $scope.hideCity = true;
                            alert('Your address is in ' + $scope.results.address_components[3].long_name + ', not in Miami-Dade County');
                            //console.log('Your address is in ' + $scope.results.address_components[3].long_name + ', not in Miami-Dade County');
                        };
                        $scope.$apply();
                    } else  {
                        alert('Location search was unsuccesful. Error : ' + status);
                    }   
                });
            });
        } 
        else  {
            alert('Error: The Geolocation service failed.');
        }
    };    

    // TODO: move to service, test from miami dade county address :D I'm in Palm Beach County
    $scope.getAddress = function getAddress () {
        var url = 'https://www.googleapis.com/civicinfo/us_v1/representatives/'+
                  'lookup?key=AIzaSyCN9rkEJ848kuw9-YO7vZ41Mt7v2bhckcs';
        var address = { 
            'address': $scope.userAddress
        };

        $scope.userAddress = userAddress.value;
        $scope.state = "FL";
        $http.post(url , address)
            .success(function (data) {
                $scope.greeting = data;
                var countywide = _.filter($scope.greeting.divisions, { 'scope': 'countywide' });
                _.forEach(countywide, function (county) {
                        // console.log(county.name);
                        if (county.name === 'Miami-Dade County') {
                            $scope.result = true;
                        } else {
                            alert('You are address is in ' + county.name + ', not in Miami-Dade County');

                            $scope.greeting = '';
                        }
                    })
            })
            .error(function (err) {
                console.error(err);
            });;
    };
}]);

repmiami.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
