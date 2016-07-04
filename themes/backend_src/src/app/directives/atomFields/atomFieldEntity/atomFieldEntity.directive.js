(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomFieldEntity', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '=',
          linkedEntity: '=',
          entityModel: '='
        },
        templateUrl: 'app/directives/atomFields/atomFieldEntity/atomFieldEntity.html',
        link: function($scope) {

          var sourceData = $scope.linkedEntity.data.data;

          $scope.entityModel[$scope.fieldName] = $scope.entityModel[$scope.fieldName] || [];

          var titleField = $scope.scheme.entity.field ? $scope.scheme.entity.field : '';
          var list = filterSourceData();
          var fields = $scope.scheme.multiple ? $scope.field : [$scope.field];

          var model = Lazy(fields).map(function(fieldItem) {
              return Lazy(list).find(function(entityItem) {
                return entityItem.id === fieldItem.$id;
              })
            })
            .compact()
            .toArray();

          $scope.entityModel[$scope.fieldName] = $scope.scheme.multiple ? model : model[0];

          $scope.list = list;
          
          $scope.triggerEvent = function() {
            $scope.$emit('atom:changeField', {fieldName: $scope.fieldName})
          };
          
          $scope.$on('atom:broadcast:changeField', function(event, params) {

            if(params.fieldName === $scope.fieldName) {
              return false;
            }

            var fieldName = params.fieldName;
            var related = $scope.scheme.related;

            if(related && related.indexOf(fieldName) !== -1) {
              $scope.list = filterSourceData();
            }
          });
          
          function filterSourceData() {

            var related = $scope.scheme.related;
            var relatedEntities = [];

            if(related) {
              relatedEntities = findReletedEntities(related);
            }

            return isRelatedFieldsSelected() ? findEntitiesWithRelation() : returnAllEntities();

            function findReletedEntities(related) {

              var selectedRelatedEntities = [];

              Lazy(related).each(function(relatedField) {
                selectedRelatedEntities = relatedEntities.concat(
                  Lazy($scope.entityModel[relatedField])
                    .map(function(item) {
                      return {
                        name: relatedField,
                        id: item.id
                      }
                    })
                    .toArray());
              });

              return selectedRelatedEntities;
            }

            function isRelatedFieldsSelected() {
              return related && related.length && relatedEntities.length;
            }

            function findEntitiesWithRelation() {
              return Lazy(sourceData)
                .map(function(item) {
                  var relatedSource = Lazy(relatedEntities).find(function(relatedItem) {
                    return item[relatedItem.name].$id === relatedItem.id;
                  });
                  if(relatedSource) {
                    return {
                      title: item[titleField],
                      id: item._id.$id
                    }
                  }
                })
                .compact()
                .toArray();
            }

            function returnAllEntities() {
              return Lazy(sourceData)
                .map(function(item) {
                  return {
                    title: item[titleField],
                    id: item._id.$id
                  }
                })
                .toArray();
            }
          }
          

        }
      };
    });

})();

