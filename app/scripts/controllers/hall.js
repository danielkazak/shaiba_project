'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:HallCtrl
 * @description
 * # HallCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('HallCtrl', function ($scope, parse, Facebook) {

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

        parse.getTable('best')
            .then(
            function(best) {
                $scope.bestSentences = best;
                $scope.bestSentences.sort(compare);
                for(var i = 0; i < $scope.bestSentences.length; i++) {
                    $scope.bestSentences[i].prevGrade = $scope.bestSentences[i].grade;
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
            console.log(ratingBar.grade + " and " + ratingBar.prevGrade);

            var newGrade = (ratingBar.usersNumber * ratingBar.prevGrade + ratingBar.grade) / (ratingBar.usersNumber + 1);
            ratingBar.prevGrade = ratingBar.grade = newGrade;

            console.log(ratingBar.grade + " and " + ratingBar.prevGrade);
        }

        $scope.fbUser = Facebook.getUserName();
        $scope.fbEmail = Facebook.getUserEmail();
  });
