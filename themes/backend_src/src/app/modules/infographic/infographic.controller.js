(function() {
  'use strict';

  angular
    .module('infographic')
    .controller('InfographicCtrl', function(
      $scope,
      $stateParams,
      EntityService,
      HelperService,
      InfographicAPIService
    ) {

      var entityName = $stateParams.entity;
      var scheme;

      $scope.entity = {};
      $scope.showGraph = false;
      $scope.entityModels = {};
      $scope.linkedEntities = {
        brand: {
          data: {}
        }
      };

      EntityService
        .getEntityDescription(entityName)
        .then(function(response){

          scheme = response.data[entityName].atomgraphics.controls;

          return HelperService.getLinkedEntities(scheme)
        })
        .then(function(responses) {

          var linkedEntities = {};
          Lazy(responses).each(function(response) {
            linkedEntities[response.entity] = response;
          });

          $scope.linkedEntities = linkedEntities;
          $scope.scheme = scheme;
          scheme = null;

        });

      $scope.getGiagram = function() {

        var entityData = {
          entity: entityName
        };

        Lazy($scope.scheme).each(function(schemeItem, fieldName) {
          if(schemeItem.type !== 'entity') {
            entityData[fieldName] = $scope.entity[fieldName]
          } else {
            Lazy($scope.entityModels[fieldName]).each(function(item, n) {
              if(!entityData[fieldName]) {
                entityData[fieldName] = [];
              }
              entityData[fieldName].push(item.id);
            });
          }
        });

        InfographicAPIService
          .getGraphicData(entityData)
          .then(function(response) {
            //$scope.line1.options.xaxis.ticks = response.data.axes.abscissa;

            var newData = [];

            Lazy(response.data.data).each(function(data) {

              var title = data.title;

              Lazy(data.data).each(function(graphDat, graphName) {
                newData.push({
                  data: graphDat,
                  label: title + ' - ' + graphName
                });
              });

            });

            $scope.line1.data = newData;

            $scope.showGraph = true;
          });

      };



      var lineChart1 = {};

      $scope.line1 = {};

      $scope.line1.data = [
        {
          data: lineChart1.data1,
          label: 'Trend'
        }
      ];

      $scope.line1.options = {
        series: {
          lines: {
            show: true,
            fill: true,
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
        colors: ['#0000FF', '#00FF00'],
        tooltip: true,
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
        }
      };

    });


})();
