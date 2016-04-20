(function() {
  'use strict';

  angular.module('errorPage', [ ])
    .config(function($stateProvider) {

      $stateProvider
        .state('error500', {
          views: {
            'content@': {
              templateUrl:  'app/modules/errorPage/500.html',
              controller: 'ErrorPageCtrl'
            }
          }
        })
      ;
    })
  ;
})();
