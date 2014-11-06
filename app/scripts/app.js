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
    'ngTouch',
    'ui.bootstrap',
    'ngFacebook'
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
  })
    .config( function( $facebookProvider ) {
        $facebookProvider.setAppId(1508138392784272);
    })
    .run( function( $rootScope ) {
        // Cut and paste the "Load the SDK" code from the facebook javascript sdk page.

        // Load the facebook SDK asynchronously
        (function(){
            // If we've already installed the SDK, we're done
            if (document.getElementById('facebook-jssdk')) {return;}

            // Get the first script element, which we'll use to find the parent node
            var firstScriptElement = document.getElementsByTagName('script')[0];

            // Create a new script element and set its id
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';

            // Set the new script's source to the source of the Facebook JS SDK
            facebookJS.src = '//connect.facebook.net/en_US/all.js';

            // Insert the Facebook JS SDK into the DOM
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);


        }());
    })

;
