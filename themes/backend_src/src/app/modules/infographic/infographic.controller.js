(function() {
  'use strict';

  angular
    .module('infographic')
    .controller('InfographicCtrl', function(
      $scope,
      $timeout,
      $stateParams,
      EntityService,
      HelperService,
      SessionService,
      AtomDiagramFactory,
      InfographicAPIService
    ) {

      var entityName = $stateParams.entity;
      var scheme, abscissaLable, ordinateLabel, defaultField;
      var selectedItems = SessionService.getSelectedItems();

      $scope.entity = {};
      $scope.showGraph = false;
      $scope.entityModels = {};
      $scope.linkedEntities = {};

      EntityService
        .getEntityDescription(entityName)
        .then(function(response){

          scheme = response.data[entityName].atomgraphics.controls;
          _.find(scheme, function(item, key){
            if(item.default) {
              defaultField = key;
              return item;
            }

          });

          if( hasPridifined() ) {
            SessionService.clearSelectedItems();
            var campaign = [];
            $scope.entityModels[defaultField] = [];
            _.each(selectedItems, function(item) {
              campaign.push({
                $id: item
              });
              $scope.entityModels[defaultField].push({
                id: item
              });
            });
            $scope.entity[defaultField] = campaign;
          }

          abscissaLable = response.data[entityName].atomgraphics.axes.abscissa.title;
          ordinateLabel = response.data[entityName].atomgraphics.axes.ordinate.title;

          initDiagram();

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


        })
        .then(function() {
          if( hasPridifined() ) {
            $scope.getGiagram();
          }
        });

      $scope.getGiagram = function() {

        var entityData = {
          entity: entityName
        };

        Lazy($scope.scheme).each(function(schemeItem, fieldName) {

          switch (schemeItem.type) {
            case 'entity' : {
              Lazy($scope.entityModels[fieldName]).each(function(item, n) {
                if(!entityData[fieldName]) {
                  entityData[fieldName] = [];
                }
                entityData[fieldName].push(item.id);
              });
              break;
            }
            case 'select' : {
              entityData[fieldName] = $scope.entityModels[fieldName] ? $scope.entityModels[fieldName].id : undefined;
              break;
            }
            default : {
              entityData[fieldName] = $scope.entity[fieldName]
            }
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


      function hasPridifined() {
        return selectedItems && selectedItems.length && defaultField;
      }

      function initDiagram() {
        $scope.line1 = AtomDiagramFactory.line1;
        $scope.line1.options.xaxis.axisLabel = abscissaLable;
        $scope.line1.options.yaxis.axisLabel = ordinateLabel;
      }


    });


})();
