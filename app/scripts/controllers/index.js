'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('IndexCtrl', function ($scope, Facebook, Title, AppAlert, parse, ngProgress) {
        parse.getTable('dishes');
        parse.getTable('nations');
        parse.getTable('adj');
        parse.getTable('best');
        parse.getTable('users');

        AppAlert.add('info', 'לחצו על ראשו של שייבה', 7000);

        Facebook.refresh();

        $scope.loginFacebook = function(){
         Facebook.login();
        }

        $scope.Title = Title;
  });
