(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomFieldHtml', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '=',
          postButton:'=',
          postButtonAction:'='
        },
        templateUrl: 'app/directives/atomFields/atomFieldHtml/atomFieldHtml.html'
      };
    });

})();

