myApp.controller('MainCtrl', function($scope, $http, $interval){
$scope.d1 = 1;
$scope.d2 = 1;
$scope.d3 = 1;
$scope.d4 = 1;
  $interval(function(){
  
    var data = [];
	data.push($scope.d1);
	data.push($scope.d2);
	data.push($scope.d3);
	data.push($scope.d4);
	
        data.map(function(d){ return d * ( 1 - Math.random() / 10) });
      $scope.donutData = data;
  }, 1000);
});
