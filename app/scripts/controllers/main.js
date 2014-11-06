'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('MainCtrl', function ($scope, parse, $q, $timeout, DataManager, Facebook) {


        // $scope objects
        $scope.nation = ' ';
        $scope.dish = ' ';
        $scope.adj = ' ';


        Facebook.refresh();
        $scope.loginFacebook = function(){
            Facebook.login();
        }


        $scope.getSentence = function(){
            parse.getRandom('dishes')
                .then(
                function(dish) {
                    $scope.dish = dish;
                },
                function(result){
                    console.log("Failed to get dish: " + result);
                });

            parse.getRandom('nations')
                .then(
                function(nation){
                    $scope.nation = nation;
                },
                function(result){
                    console.log("Failed to get nation: " + result);
                });

            parse.getRandom('adj')
                .then(
                function(adj){
                    $scope.adj = adj;
                },
                function(result){
                    console.log("Failed to get nation: " + result);
                });
        }


    });
