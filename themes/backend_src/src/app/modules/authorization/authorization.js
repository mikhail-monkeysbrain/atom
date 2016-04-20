(function() {
'use strict';

  angular.module('authorization', [ 'components.session' , 'components.auth' ])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
//TODO: Refactor!
      $stateProvider
        .state('login', {
          url: '/login',
          views: {
            'content@': {
              templateUrl:  'app/modules/authorization/authorization.html',
              controller: 'AuthorizationCtrl'
            }
          }
        })
        .state('logout', {
          url: '/logout',
          views: {
            'content@': {
              templateUrl:  'app/modules/authorization/authorization.html',
              controller: 'AuthorizationCtrl'
            }
          }
        })
        ;
    })
    ;
})();
