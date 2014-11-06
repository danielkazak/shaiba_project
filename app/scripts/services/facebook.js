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


    var facebookService = {

        // Vars to return
        userDetails: {
            userName: '',
            userEmail: ''
        },

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
        refresh: function() {
            $facebook.api("/me").then(
                function(response) {
                    $rootScope.welcomeMsg = "Welcome " + response.name;
                    facebookService.userDetails.userName = response.name;
                    facebookService.userDetails.userEmail = response.email;
                    $rootScope.isLoggedIn = true;
                },
                function(err) {
                    $rootScope.welcomeMsg = "Please log in";
                });
        },
        getUserEmail: function() {
            if($rootScope.isLoggedIn === true){

            }
        },
        getUserName: function(){
            if ($rootScope.isLoggedIn === true){
                return facebookService.userDetails.userName;
            } else {
                return "No active user found.";
            }
        },
        login:  function() {
            $facebook.login().then(function() {
                console.log(facebookService);
                facebookService.refresh();
            });
        },
        logout: function() {
            $facebook.logout().then(function(){
                facebookService.refresh();
            });
        }



    };
        return facebookService;
  });
