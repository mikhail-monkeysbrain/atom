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
          link: function(scope, ele, attrs) {
            var data, options, plot;
            data = scope.data;
            options = scope.options;

            scope.$watch('data', function() {
              plot.setData(data);
              plot.setupGrid(); //only necessary if your new data will change the axes or grid
              plot.draw();
            }, true);

            return plot = $.plot(ele[0], data, options);
          }
        };
      }
    ]);

})();
