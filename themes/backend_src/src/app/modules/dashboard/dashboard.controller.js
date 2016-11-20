(function() {
  'use strict';

  angular.module('dashboard')
    .controller('DashboardCtrl', function($state, $cookies, $rootScope, $timeout) {
      if ($rootScope.authorized) {
		$timeout(function () {
        	var homepage = $cookies.get('homepage');
        	$state.go('entitiesList', {entity: homepage});
		});
      }
    });
})();
