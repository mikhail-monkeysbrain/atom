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
      };
    });

})();

