(function() {
  'use strict';

  angular.module('components.atomPassword')
    .directive('atomPassword', function(SessionService) {

      return {
        restrict:    'AE',
        transclude: true,
        template: '<span ng-transclude></span>',
        link: function($scope) {
          $scope.atomPassword = {
            type: 'password',
            generatePassword: function() {
              $scope.atomPassword.type = 'text';
              $scope.form[$scope.key] = Math.random().toString(36).slice(-8);
            }
          };
        }
      };
    });

})();

