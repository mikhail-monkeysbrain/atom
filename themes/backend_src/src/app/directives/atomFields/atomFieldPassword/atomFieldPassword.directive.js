(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomFieldPassword', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '='
        },
        templateUrl: 'app/directives/atomFields/atomFieldPassword/atomFieldPassword.html',
		link: function($scope) {
          $scope.atomPassword = {
            type: "password",
            generatePassword: function() {
              $scope.atomPassword.type = 'text';
              $scope.field = Math.random().toString(36).slice(-8);
            }
          };
        }
      };
    });

})();

