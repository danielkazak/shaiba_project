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
        // Define scope vars for sentence
        $scope.dish = '';
        $scope.nation = '';
        $scope.adj = '';

        // Random function
        function Random(num){
            return Math.floor(Math.random() * num);
        }

        // Initialize $scope vars for DOM (check the main.HTML page)
        parse.getParse('dishes').success(function(data){$scope.dish = data.results[Random(data.results.length)].dishName; });
        parse.getParse('nations').success(function(data){$scope.nation = data.results[Random(data.results.length)].natName; });
        parse.getParse('adj').success(function(data){$scope.adj = data.results[Random(data.results.length)].adjName; });

    });
