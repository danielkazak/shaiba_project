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
        $rootScope.fbUserName = null;

    var facebookService = {

        // Vars to return
        userDetails: {
            userName: '',
            userEmail: '',
            userId: ''
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
                    $rootScope.fbUserName = response.name;
                    facebookService.userDetails.userEmail = response.email;
                    facebookService.userDetails.userId = response.id;
                    $rootScope.isLoggedIn = true;
                },
                function(err) {
                    $rootScope.welcomeMsg = "Please log in";
                });
        },
        getUserId: function(){
            if ($rootScope.isLoggedIn === true){
                return facebookService.userDetails.userId;
            } else {
                console.log($rootScope.isLoggedIn);
                return '';
            }
        },
        login:  function() {
            $facebook.login().then(function() {
                console.log(facebookService);
                facebookService.refresh();
            });
        }
        /*logout: function() {
            $facebook.logout().then(function(){
                $rootScope.fbUserName = null;
                facebookService.refresh();
            });
        }*/



    };
        return facebookService;
  });
