(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomForm', function() {

      return {
        restrict:    'A',
        controller: function($scope) {

          $scope.$on('atom:changeField', function(event, params) {
            event.stopPropagation();
            $scope.$broadcast('atom:broadcast:changeField', params);
          });

        }
      };
    });

})();

