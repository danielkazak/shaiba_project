'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('IndexCtrl', function ($scope, Facebook, Title, AppAlert, parse, $rootScope) {
        $scope.Title = Title;
        $rootScope.admins = [];

        parse.getTable('dishes');
        parse.getTable('nations');
        parse.getTable('adj');
        parse.getTable('best');
        parse.getTable('users')
            .then(function(users) {
                angular.forEach(users, function(user) {
                    if(user.isAdmin) {
                        $rootScope.admins.push(user.fbId);
                    }
                });
                Facebook.refresh();
            }, function() {
                Facebook.refresh();
            });

        $scope.menuItems = {
          home: {href: '#/', class: 'glyphicon glyphicon-home nav-custom'},
          about: {href: '#/about', class: 'glyphicon glyphicon-pencil nav-custom'},
          hall: {href: '#/halloffame', class: 'glyphicon glyphicon-star nav-custom'}
        };

        $rootScope.favStarCss = 'glyphicon glyphicon-star favstar pull-left';

        $scope.loginFacebook = function(){
         Facebook.login();
        };

        $scope.Title = Title;

        $scope.selectedIndex = 0;

        $scope.itemClicked = function ($index) {
            $scope.selectedIndex = $index;
        };


    });
