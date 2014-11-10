'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:HallCtrl
 * @description
 * # HallCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('HallCtrl', function ($scope, parse, Facebook, $rootScope, Title) {
        Title.setTitle('היכל התהילה');
        $scope.bestSentences = null;

        function compare(a, b) {
            if (a.grade > b.grade) {
                return -1;
            }
            if (a.grade < b.grade) {
                return 1;
            }
            return 0;
        }

        parse.getTable('best', false)
            .then(
            function(best) {
                $scope.bestSentences = best;
                $scope.bestSentences.sort(compare);
                for(var i = 0; i < $scope.bestSentences.length; i++) {
                    $scope.bestSentences[i].prevGrade = $scope.bestSentences[i].grade;
                    $scope.bestSentences[i].alreadyChanged = false;
                }
            },
            function(result){
                console.log("Failed to get dish: " + result);
            });

        //$scope.rate = 5;
        $scope.isReadOnly = false;
        $scope.max = 10;

        $scope.showGrades = function() {
            console.log($scope.bestSentences);
        }


        $scope.changeRating = function(index) {
            var ratingBar = $scope.bestSentences[index];
            console.log(ratingBar);

            var newGrade = (ratingBar.usersNumber * ratingBar.prevGrade + ratingBar.grade) / (ratingBar.usersNumber + 1);
            ratingBar.prevGrade = ratingBar.grade = newGrade;
            ratingBar.usersNumber++;
            ratingBar.alreadyChanged = true;
            $scope.bestSentences.sort(compare);
            var data = {grade: ratingBar.grade, usersNumber: ratingBar.usersNumber};
            parse.putToParse('best', ratingBar.objectId, data);
            console.log(ratingBar);
        }

  });
