(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomFieldString', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '=',
          postButton:'=',
          postButtonAction:'='
        },
        templateUrl: 'app/directives/atomFields/atomFieldString/atomFieldString.html'
      };
    });

})();

