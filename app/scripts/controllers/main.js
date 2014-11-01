'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('MainCtrl', function ($scope, parse) {
        $scope.dish = '';
        $scope.nation = '';
        $scope.adj = '';

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        function Random(num){
            return Math.floor(Math.random() * num);
        }

        parse.getParse('dishes').success(function(data){$scope.dish = data.results[Random(data.results.length)].dishName; });
        parse.getParse('nations').success(function(data){$scope.nation = data.results[Random(data.results.length)].natName; });
        parse.getParse('adj').success(function(data){$scope.adj = data.results[Random(data.results.length)].adjName; });

    });
