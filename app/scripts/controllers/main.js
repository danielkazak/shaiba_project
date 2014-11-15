'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('MainCtrl', function ($scope, parse, $q, $timeout, Facebook, AppAlert, Title, $rootScope, SharedData) {
        Title.setTitle('מחולל שייבה');

        /*AppAlert.add('info', 'לחצו על ראשו של שייבה', 5000);*/

        // $scope objects
        $scope.nation = '';
        $scope.dish = '';
        $scope.adj = '';

        $scope.getSentence = function(){
            parse.getRandom('dishes')
                .then(
                function(dish) {
                    $rootScope.favStarCss = 'glyphicon glyphicon-star favstar pull-left';
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
            if($rootScope.isLoggedIn && $scope.nation !== '' && $scope.dish !== '' && $scope.adj !== '') {
                parse.getTable('best', false)
                    .then(function (best) {
                        var checksentence = $scope.dish + ' ' + $scope.nation + ' ' + $scope.adj;
                        var exists = false;
                        for (var i = 0; i < best.length && !exists; i++) {
                            if (best[i].name === checksentence) {
                                exists = true;
                                $rootScope.favStarCss = 'glyphicon glyphicon-star favstar-disabled pull-left';
                                AppAlert.add(SharedData.appAlertTypes.WARNING, 'המשפט כבר חוגג בהיכל התהילה, נשמה, נסה שוב')
                            }
                        }
                        if (!exists) {
                                parse.postToparse('best', {
                                    name: $scope.dish
                                        + ' ' + $scope.nation
                                        + ' ' + $scope.adj,
                                    grade: 4,
                                    usersNumber: 1,
                                    user: Facebook.userDetails.userId,
                                    usersVoted: {"__op": "AddUnique", "objects": [Facebook.userDetails.userId]}
                                }).then(function (success) {
                                        $rootScope.favStarCss = 'glyphicon glyphicon-star favstar-disabled pull-left';
                                        parse.getTable('best', true);
                                    },
                                    function (error) {
                                        AppAlert.add(SharedData.appAlertTypes.DANGER, 'התרחשה בעיה בשרת')
                                    }
                                );
                                AppAlert.add(SharedData.appAlertTypes.SUCCESS, 'המשפט התווסף להיכל התהילה', 4000);
                        }
                    },
                    function (error) {
                        AppAlert.add(SharedData.appAlertTypes.DANGER, 'וואלה הפארס לא מגיב, נשמה ' + error);
                    });
            } else {
                AppAlert.add(SharedData.appAlertTypes.WARNING, 'שייבה לא אמר כלום יא פלופ! טיפ: לחץ על הראש.', 4000);
            }
        }
    });
