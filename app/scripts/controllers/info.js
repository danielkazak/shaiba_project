'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:InfoCtrl
 * @description
 * # InfoCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('InfoCtrl', function ($scope) {
        $scope.doronTitle = 'דורון סגס';
        $scope.doronContent = 'content';
        $scope.danielTitle = 'דניאל קזק';
        $scope.danielContent = 'content';
        $scope.mailDoron = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=sagesdoron@gmail.com&su=SUBJECT&body=Hey%20Doron,%20&tf=1';
  });
