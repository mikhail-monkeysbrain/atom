(function() {
  'use strict';

  angular.module('components.popup')
    .directive('confirmDelete',function() {
      return {
        restrict:       'EA',
        transclude: true,
        scope:       true,
        templateUrl: 'app/components/popup/popup.html',
        controller: function($scope) {

        }
      };
    });

})();