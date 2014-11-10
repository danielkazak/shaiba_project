'use strict';

/**
 * @ngdoc service
 * @name shaibaApp.Facebook
 * @description
 * # Facebook
 * Factory in the shaibaApp.
 */
angular.module('shaibaApp')
  .factory('Facebook', function ($facebook, $q, $rootScope, ngProgress, parse) {
    // Service logic
    // ...
        $rootScope.isLoggedIn = false;
        $rootScope.fbUserName = null;
        $rootScope.showFbLogin = false;
        $rootScope.favStarCss = 'glyphicon glyphicon-star favstar-disabled pull-left';

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
            var deferred = $q.defer();
            ngProgress.start();
            $facebook.api("/me").then(
                function(response) {
                    $rootScope.welcomeMsg = "Welcome " + response.name;
                    facebookService.userDetails.userName = response.name;
                    facebookService.userDetails.userEmail = response.email;
                    facebookService.userDetails.userId = response.id;
                    $rootScope.showFbLogin = false;
                    $rootScope.isLoggedIn = true;
                    $rootScope.favStarCss = 'glyphicon glyphicon-star favstar pull-left';
                    ngProgress.complete();
                    deferred.resolve(response);
                },
                function(err) {
                    $rootScope.welcomeMsg = "Please log in";
                    $rootScope.favStarCss = 'glyphicon glyphicon-star favstar-disabled pull-left';
                    $rootScope.showFbLogin = true;
                    ngProgress.complete();
                    deferred.reject(null);
                });
            return deferred.promise;
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
                facebookService.refresh()
                    .then(function(response){
                       parse.getTable('users', false)
                           .then(function(users){
                               var boolean = false;
                               angular.forEach(users, function(user){
                                   console.log(user);
                                   if(user.fbId === response.id){
                                       boolean = true;
                                   }
                               });
                               if (!boolean){
                                   parse.postToparse('users', {fbId: response.id, fbUserName: response.name, fbEmail: response.email});
                                   console.log('New user!!' + response.id);
                               }
                           });
                    });
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
