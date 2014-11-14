'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:HallCtrl
 * @description
 * # HallCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('HallCtrl', function ($scope, parse, Facebook, $rootScope, Title, AppAlert, SharedData, $timeout) {
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

        // This function is responsible to the progress that should happen after a user tries to rate a sentence
        $scope.changeRating = function(index) {
            var sentence = $scope.bestSentences[index];

            if (sentence.isReadOnly) { return; }

            sentence.color = "rated-pending";
            var newGrade = (sentence.usersNumber * sentence.prevGrade + sentence.grade) / (sentence.usersNumber + 1);
            sentence.grade = newGrade;
            sentence.usersNumber++;
            sentence.isReadOnly = true;
            sentence.usersVoted.push(Facebook.getUserId());
            $scope.bestSentences.sort(compare);

            var data = {
                grade: sentence.grade,
                usersNumber: sentence.usersNumber,
                "usersVoted":{"__op":"AddUnique","objects":[Facebook.getUserId()]}};

            parse.putToParse('best', sentence.objectId, data).
                then(function(response) {
                    sentence.prevGrade = sentence.grade;
                    sentence.color = "rated-success";
                }, function(response) {
                    sentence.grade = sentence.prevGrade;
                    sentence.usersNumber--;
                    sentence.isReadOnly = false;

                    var sentenceIndex = sentence.usersVoted.indexOf(Facebook.getUserId()); //IE 8,9 don't support indexOf
                    if (sentenceIndex > -1) {
                        sentence.usersVoted.splice(sentenceIndex, 1);
                    }
                    $scope.bestSentences.sort(compare);

                    AppAlert.add(SharedData.appAlertTypes.DANGER, response, 5000);
                    sentence.color = "rated-failed";
                });
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
                        $scope.bestSentences[i].color = '';
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
