(function() {
  'use strict';

  angular.module('directives.atomFieldString')
    .directive('atomFieldString', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '='
        },
        templateUrl: 'app/directives/atomFieldString/atomFieldString.html',
      };
    });

})();

