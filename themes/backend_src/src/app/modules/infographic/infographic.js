(function() {
  'use strict';

  angular.module('infographic', [])
    .config(function($stateProvider) {

      $stateProvider
        .state('infographic', {
          url: '/graphics/:entity',
          views: {
            'content@': {
              templateUrl:  'app/modules/infographic/infographic.html',
              controller: 'InfographicCtrl'
            }
          }
        })
      ;
    })
  ;
})();
