(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomFieldBoolean', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '='
        },
        templateUrl: 'app/directives/atomFields/atomFieldBoolean/atomFieldBoolean.html'
      };
    });

})();

