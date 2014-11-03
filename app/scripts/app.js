'use strict';

/**
 * @ngdoc overview
 * @name shaibaApp
 * @description
 * # shaibaApp
 *
 * Main module of the application.
 */
angular
  .module('shaibaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/halloffame',{
            templateUrl: 'views/halloffame.html',
            controller: 'HallCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
