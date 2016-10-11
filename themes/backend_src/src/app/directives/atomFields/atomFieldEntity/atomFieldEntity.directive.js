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

          var sourceData = [];

          try {sourceData = $scope.linkedEntity;} catch (e) {}

          $scope.entityModel[$scope.fieldName] = $scope.entityModel[$scope.fieldName] || [];

          var titleField = $scope.scheme.entity.field ? $scope.scheme.entity.field : '';
          var list = filterSourceData();
          var fields = $scope.scheme.multiple ? $scope.field : [$scope.field];
		  if(!angular.isArray(fields)) {
            fields = [];
          }

          var model = fields
            .filter(function (key) {
              return !!key || key === 0;
            })
            .map(function(fieldItem) {
              return list.find(function(entityItem) {
                return entityItem.id === fieldItem.$id;
              })
            })
            .filter(function (key) {
              return !!key || key === 0;
            });

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

		  $scope.$on('atom:broadcast:setEntityById', function(event, params) {
            var fieldName = params.fieldName;
            var id = params.id;
            if(fieldName !== $scope.fieldName) {
              return false;
            }
            var fields = $scope.list.filter(function(item) {
              return item.id === id;
            });
            $scope.entityModel[fieldName] = $scope.scheme.multiple ? fields : fields[0];
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

              related.forEach(function(relatedField) {
                selectedRelatedEntities = relatedEntities.concat(
                  $scope.entityModel[relatedField]
                    .map(function(item) {
                      return {
                        name: relatedField,
                        id: item.id
                      }
                    }));
              });

              return selectedRelatedEntities;
            }

            function isRelatedFieldsSelected() {
              return related && related.length && relatedEntities.length;
            }

            function findEntitiesWithRelation() {
              return sourceData
                .map(function(item) {
                  var relatedSource = relatedEntities.find(function(relatedItem) {
                    return item[relatedItem.name].$id === relatedItem.id;
                  });
                  if(relatedSource) {
                    return {
                      title: item[titleField],
                      id: item._id.$id
                    }
                  }
                })
                .filter(function (key) {
                  return !!key || key === 0;
                });
            }

            function returnAllEntities() {
              return sourceData
                .map(function(item) {
                  return {
                    title: item.title,
                    id: item.$id
                  }
                });
            }
          }
          

        }
      };
    });

})();

