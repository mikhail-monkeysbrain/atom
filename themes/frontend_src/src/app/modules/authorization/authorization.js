(function() {
'use strict';

  angular.module('authorization', [])
    .config(function($stateProvider) {

//TODO: Refactor!
      $stateProvider
        .state('login', {
          url: '/login',
          views: {
            'content@': {
              templateUrl:  'app/modules/authorization/signin/authorization.html',
              controller: 'AuthorizationCtrl'
            }
          }
        })
        .state('logout', {
          url: '/logout',
          views: {
            'content@': {
              templateUrl:  'app/modules/authorization/signin/authorization.html',
              controller: 'AuthorizationCtrl'
            }
          }
        })
        .state('register', {
          url: '/signup',
          views: {
            'content@': {
              templateUrl:  'app/modules/authorization/signup/registration.html',
              controller: 'RegistrationCtrl'
            }
          }
        })
        ;
    })
    ;
})();
