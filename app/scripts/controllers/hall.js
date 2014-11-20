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
        Title.setTitle(SharedData.siteTitles.HALL);
        $scope.bestSentences = {};
        $scope.max = 5;

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
                        current.isReadOnly = false;
                        for(var j = 0; j < current.usersVoted.length && current.isReadOnly === false; j++){
                            if(current.usersVoted[j] === Facebook.getUserId() || Facebook.getUserId() === ''){
                                current.isReadOnly = true;
                            }
                        }
                    }
                },
                function(result){
                    console.log('Failed to get dish: ' + result);
                });
        }

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

            sentence.color = 'rated-pending';
            sentence.grade = (sentence.usersNumber * sentence.prevGrade + sentence.grade) / (sentence.usersNumber + 1);
            sentence.usersNumber++;
            sentence.isReadOnly = true;
            sentence.usersVoted.push(Facebook.getUserId());
            $scope.bestSentences.sort(compare);
            if(sentence.usersNumber === 5) {
                sentence.grade = (sentence.grade * sentence.usersNumber + sentence.grade - 2) / sentence.usersNumber;
            }

            var data = {
                grade: sentence.grade,
                usersNumber: sentence.usersNumber,
                'usersVoted':{'__op': 'AddUnique', 'objects': [Facebook.getUserId()]}};

            parse.putToParse('best', sentence.objectId, data).
                then(function() {
                    sentence.prevGrade = sentence.grade;
                    sentence.color = 'rated-success';
                    $timeout(function() {
                        sentence.color = '';},
                        3000);
                }, function(error) {
                    sentence.grade = sentence.prevGrade;
                    sentence.usersNumber--;
                    sentence.isReadOnly = false;

                    var sentenceIndex = sentence.usersVoted.indexOf(Facebook.getUserId()); //IE 8,9 don't support indexOf
                    if (sentenceIndex > -1) {
                        sentence.usersVoted.splice(sentenceIndex, 1);
                    }
                    $scope.bestSentences.sort(compare);

                    AppAlert.add(SharedData.appAlertTypes.DANGER, error, 5000);
                    sentence.color = 'rated-failed';
                    $timeout(function() {
                            sentence.color = '';},
                        5000);
                });
        };

        // Watch if a user is logged in to run validation
        $rootScope.$watch(function(rootScope) { return rootScope.isLoggedIn; },
            function() {
                validateRatingFunctionality();
            });

        $scope.$on("$destroy", function(){
            for(var i = 0; i < $scope.bestSentences.length; i++) {
                $scope.bestSentences[i].color = '';
            }
        });
  });
