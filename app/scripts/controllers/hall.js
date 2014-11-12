'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:HallCtrl
 * @description
 * # HallCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('HallCtrl', function ($scope, parse, Facebook, $rootScope, Title, AppAlert, SharedData) {
        Title.setTitle('היכל התהילה');
        $scope.bestSentences = null;
        $scope.max = 10;

        function compare(a, b) {
            if (a.grade > b.grade) {
                return -1;
            }
            if (a.grade < b.grade) {
                return 1;
            }
            return 0;
        }

        validateRatingFunctionality();
        /*parse.getTable('best', false)
            .then(
            function(best) {
                $scope.bestSentences = best;
                $scope.bestSentences.sort(compare);
               *//* for(var i = 0; i < $scope.bestSentences.length; i++) {
                    $scope.bestSentences[i].prevGrade = $scope.bestSentences[i].grade;
                }*//*
            },
            function(result){
                console.log("Failed to get dish: " + result);
            });*/

        $scope.showGrades = function() {
            console.log($scope.bestSentences);
        }

        $scope.changeRating = function(index) {
            var sentence = $scope.bestSentences[index];
            console.log(sentence);

            var newGrade = (sentence.usersNumber * sentence.prevGrade + sentence.grade) / (sentence.usersNumber + 1);
            sentence.grade = newGrade;
            sentence.usersNumber++;
            sentence.isReadOnly = true;
            $scope.bestSentences.sort(compare);

            var data = {
                grade: sentence.grade,
                usersNumber: sentence.usersNumber,
                "usersVoted":{"__op":"AddUnique","objects":[Facebook.getUserId()]}};

            parse.putToParse('best', sentence.objectId, data).
                then(function(response) {
                    sentence.prevGrade = sentence.grade;
                }, function(response) {
                    sentence.grade = sentence.prevGrade;
                    sentence.usersNumber--;
                    sentence.isReadOnly = false;
                    $scope.bestSentences.sort(compare);
                    AppAlert.add(SharedData.appAlertTypes.DANGER, response);
                });

            console.log(sentence);
        }


        // Validating user rating options (whether voted already or not)
        function validateRatingFunctionality(){
            parse.getTable('best', false)
                .then(
                function(best) {
                    $scope.bestSentences = best;
                    $scope.bestSentences.sort(compare);
                    for(var i = 0; i < $scope.bestSentences.length; i++) {
                        $scope.bestSentences[i].prevGrade = $scope.bestSentences[i].grade;
                        var current = $scope.bestSentences[i];
                        for(var j = 0; j < current.usersVoted.length; j++){
                            if(current.usersVoted[j] === Facebook.getUserId() || Facebook.getUserId() === ''){
                                current.isReadOnly = true;
                            }
                            else {
                                current.isReadOnly = false;
                            }
                        }
                    }
                },
                function(result){
                    console.log("Failed to get dish: " + result);
                });
        }

        // Watch if a user is logged in to run validation
        $rootScope.$watch(function(rootScope) { return rootScope.isLoggedIn },
            function() {
                validateRatingFunctionality();
            });

  });
