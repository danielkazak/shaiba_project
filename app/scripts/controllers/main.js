'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('MainCtrl', function ($scope, parse, $q, $timeout, DataManager, Facebook, AppAlert, Title, $rootScope) {
        Title.setTitle('מחולל שייבה');

        // $scope objects
        $scope.nation = '';
        $scope.dish = '';
        $scope.adj = '';

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

        $scope.addToHall = function(){
            if($rootScope.isLoggedIn && $scope.nation !== '' && $scope.dish !== '' && $scope.adj !== ''){
                parse.postToparse('best', {
                    name: $scope.dish
                        + ' ' + $scope.nation
                        + ' ' + $scope.adj,
                    grade: 4,
                    usersNumber: 1,
                    user: Facebook.userDetails.userId
                }).then(function(success){
                    parse.getTable('best', true);
                },
                    function(error){
                        AppAlert.add('danger', 'התרחשה בעיה בשרת')
                    }
                );
                AppAlert.add('success', 'המשפט התווסף להיכל התהילה', 4000);
            } else {
                AppAlert.add('warning', '!שייבה לא אמר כלום יא פלופ', 4000);
            }
        }
    });
