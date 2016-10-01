
    myApp.controller('barchartcntrl', function AppCtrl ($scope) {
            $scope.options = {width: 500, height: 300, 'bar': 'aaa'};
			 $scope.options.d1=1;
			 $scope.options.d2=1;
			 $scope.options.d3=1;
			 $scope.options.d4=1;
            $scope.data = [1, 2, 3, 4];
            $scope.hovered = function(d){
                $scope.barValue = d;
                $scope.$apply();
            };
            $scope.barValue = 'None';
			
        })
        .directive('barChart', function(){
            var chart = d3.custom.barChart();
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="chart"></div>',
                scope:{
                    height: '=height',
                    data: '=data',
                    hovered: '&hovered'
                },
                link: function(scope, element, attrs) {
                    var chartEl = d3.select(element[0]);
                    chart.on('customHover', function(d, i){
                        scope.hovered({args:d});
                    });

                    scope.$watch('data', function (newVal, oldVal) {
                        chartEl.datum(newVal).call(chart);
                    });

                    scope.$watch('height', function(d, i){
                        chartEl.call(chart.height(scope.height));
                    })
                }
            }
        })
        .directive('chartForm', function(){
            return {
                restrict: 'E',
                replace: true,
                controller: function AppCtrl ($scope,$interval) {
					var interval = $interval(function() {
					   $scope.update();
					}, 1000);
                    $scope.update = function(d, i){ 
                        var data=[];
                        data.push($scope.options.d1);
                        data.push($scope.options.d2);
                        data.push($scope.options.d3);
                        data.push($scope.options.d4);
                        $scope.data = data
                    };
                    function randomData(){
                        return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
                    }
                },
                template: '<div class="form">' +
                        'Value1:<input type="text" value="1" ng-model="options.d1" min="100" max="800"/>' +
                        'Value2:<input type="text" value="1" ng-model="options.d2" min="100" max="800"/>' +
                        'Value3:<input type="text" value="1" ng-model="options.d3" min="100" max="800"/>' +
                        'Value4:<input type="text" ng-model="options.d4" min="100" max="800"/>' +
                        '<br />' 
				
                        
            }
        });
