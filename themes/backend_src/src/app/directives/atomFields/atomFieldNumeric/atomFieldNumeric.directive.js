(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomFieldNumeric', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '=',
          postButton:'=',
          postButtonAction:'='
        },
        templateUrl: 'app/directives/atomFields/atomFieldNumeric/atomFieldNumeric.html'
      };
    });

})();

