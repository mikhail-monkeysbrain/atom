(function() {
  'use strict';

  angular
    .module('directives.atomDiagram')
    .factory('AtomDiagramFactory', function (moment) {
      var factory = this;

      factory.line1 = {};

      factory.line1.data = [
        {
          data: [],
          label: 'Trend'
        }
      ];

      factory.line1.options = {
        series: {
          shadowSize: 0,
          lines: {
            show: true,
            fill: false,
            fillColor: {
              colors: [
                {
                  opacity: 0
                }, {
                  opacity: 0.3
                }
              ]
            }
          },
          points: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: "#ffffff",
            symbol: "circle",
            radius: 5
          }
        },
        //colors: ['#0000FF', '#FFFF00'],
        tooltip: {
          show: true,
          content: function(x,abs, ord) {
            return 'Date: ' + moment(abs * 1000).format('DD MMMM YYYY') + ' Total Hours: ' + ord;
          },
          defaultTheme: true
        },
        tooltipOpts: {
          defaultTheme: false
        },
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: "#f9f9f9",
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        xaxis: {
          ticks: []
        },
        yaxis: {},
        legend: {
          container: '#legend'
        }
      };

      return factory;
    });
})();