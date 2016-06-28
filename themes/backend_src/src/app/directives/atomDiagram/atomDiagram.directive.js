(function() {
  'use strict';

  angular
    .module('directives.atomDiagram', [])
    .directive('atomFlotChart', [
      function() {
        return {
          restrict: 'A',
          scope: {
            data: '=flotData',
            options: '=flotOptions'
          },
          link: function($scope, ele) {
            var data, options, plot;
            data = $scope.data;
            options = $scope.options;

            $scope.$watch('data', function() {
              plot.setData($scope.data);
              plot.setupGrid();
              plot.draw();
            }, true);

            return plot = $.plot(ele[0], data, options);
          }
        };
      }
    ]);

})();
