'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('MainCtrl', function ($scope, parse, $q, $timeout) {
        console.log(parse);

        // $scope objects
        $scope.sentence;

        //    We have a function on the scope that can update the name.
        $scope.getTables = function() {
            parse.getTable('nations')
                .then(
                /* success function */
                function(data) {
                    $scope.sentence = data;
                },
                /* error function */
                function(result) {
                    console.log("Failed to get the name, result is " + result);
                });
        };



    });
