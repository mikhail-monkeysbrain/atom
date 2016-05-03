(function() {
  'use strict';

  angular.module('directives.atomFieldBoolean')
    .directive('atomFieldBoolean', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '='
        },
        templateUrl: 'app/directives/atomFieldBoolean/atomFieldBoolean.html',
      };
    });

})();

