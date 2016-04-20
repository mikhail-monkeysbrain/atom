(function() {
  'use strict';

  angular.module('dashboard')
    .controller('DashboardCtrl', function($state, $cookies, $rootScope) {
      if ($rootScope.authorized) {
        var homepage = $cookies.get('homepage');
        $state.go('entitiesList', {entity: homepage});
      }
    });
})();
