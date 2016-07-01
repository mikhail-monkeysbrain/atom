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

          $scope.entityModel[$scope.fieldName] = $scope.entityModel[$scope.fieldName] || [];

          var titleField = $scope.scheme.entity.field ? $scope.scheme.entity.field : '';
          var list = Lazy($scope.linkedEntity.data.data).map(function(item) {
            return {
              title: item[titleField],
              id: item._id.$id
            }
          }).toArray();


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
        }
      };
    });

})();

