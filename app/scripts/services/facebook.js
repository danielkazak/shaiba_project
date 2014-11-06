'use strict';

/**
 * @ngdoc service
 * @name shaibaApp.Facebook
 * @description
 * # Facebook
 * Factory in the shaibaApp.
 */
angular.module('shaibaApp')
  .factory('Facebook', function ($facebook, $q, $rootScope) {
    // Service logic
    // ...
        $rootScope.isLoggedIn = false;

    return {

        // Test facebook connection
        testFacebook: function() {
            $facebook.api("/me").then(
                function (response) {
                    console.log("Welcome " + response.name);
                },
                function (err) {
                    console.log("Please log in");
                });
        },

        login:  function() {
            $facebook.login().then(function() {
                this.refresh();
            });
        },
        refresh: function() {
            $facebook.api("/me").then(
                function(response) {
                    $rootScope.welcomeMsg = "Welcome " + response.name;
                    $rootScope.isLoggedIn = true;
                },
                function(err) {
                    $rootScope.welcomeMsg = "Please log in";
                });
        }

        //refresh();
    };
  });
