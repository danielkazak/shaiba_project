'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AboutCtrl', function ($scope, parse) {

        // Send attributes to class attribute for directive (so onkeyup can send attribute directly)
        $scope.dishes = 'dishes';
        $scope.nations = 'nations';
        $scope.adj = 'adj';

        // Two way binding for reading input value
        $scope.dishText;
        $scope.nationText;
        $scope.adjText;


        $scope.postData = function(parseTable, parseVal) {
            parse.postToparse(parseTable, parseVal)
                .then(function(response){
                    console.log(response);
                    $scope.dishText = '';
                    $scope.nationText = '';
                    $scope.adjText = '';
                },
                function(error){
                    console.log("ERROR: " + error);
                });
        };




  });
