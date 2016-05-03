(function() {
  'use strict';

  angular.module('directives.atomFieldPassword')
    .directive('atomFieldPassword', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '='
        },
        templateUrl: 'app/directives/atomFieldPassword/atomFieldPassword.html',
      };
    });

})();

