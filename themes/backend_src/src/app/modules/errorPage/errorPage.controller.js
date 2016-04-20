(function() {
  'use strict';

  angular.module('errorPage')
    .controller('ErrorPageCtrl', function($scope, $rootScope) {
      $rootScope.hidePanels = true;
      $scope.closeError = function() {
        $rootScope.hidePanels = false;
      };
    });
})();
