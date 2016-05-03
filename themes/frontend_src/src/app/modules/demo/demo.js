(function () {
  'use strict';

  angular
    .module('demo', [])
    .config(function($stateProvider) {

      $stateProvider
        .state('app.demo', {
          url:        'demo'
          , abstract: true
        })
      ;

      $stateProvider
        .state('app.demo.index', {
          url: ''
          , views: {
            'content@': {
              templateUrl:  'app/modules/demo/demo.html'
              , controller: 'DemoCtrl'
            }
          }
        })
        .state('app.demo.read', {
          url: '/:id'
          , views: {
            'content@': {
              templateUrl:  'app/modules/demo/read/demoRead.html'
              , controller: 'DemoReadCtrl'
            }
          }
        })
      ;
    });

})();