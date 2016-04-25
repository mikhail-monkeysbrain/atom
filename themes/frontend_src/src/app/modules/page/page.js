(function () {
  'use strict';

  angular
    .module('page', [])
    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('customHandler', {
          views: {
            'content@': {
              templateUrl: 'app/modules/page/page.html',
              controller: 'CustomPageCtrl'
            }
          }
        });

      $stateProvider
        .state('page', {
          url:  '/page',
          views: {
            'content@': {
              templateUrl: 'app/modules/page/page.html',
              controller: 'TestPageCtrl'
            }
          }
        });

      $urlRouterProvider.otherwise(function($injector) {
        $injector.get('$state').go('customHandler');
      });

    });

})();