(function() {
  'use strict';

  angular.module('errorPage')
    .controller('ErrorPageCtrl', function($scope, $state, handleErrorPages) {
      if(!handleErrorPages) {
        $state.go('app');
      }
    });
})();
