(function() {
  'use strict';

  angular.module('dashboard', [ 'components.session' , 'components.auth' ])
    .config(function($stateProvider) {

      $stateProvider
        .state('dashboard', {
          url: '/',
          views: {
            'content@': {
              templateUrl:  'app/modules/dashboard/dashboard.html',
              controller: 'DashboardCtrl'
            }
          }
        })
      ;
    })
  ;
})();
