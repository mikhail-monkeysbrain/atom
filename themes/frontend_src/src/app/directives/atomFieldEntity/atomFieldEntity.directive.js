(function() {
  'use strict';

  angular.module('directives.atomFieldEntity')
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
        templateUrl: 'app/directives/atomFieldEntity/atomFieldEntity.html',
        link: function($scope) {

          $scope.entityModel[$scope.fieldName] = $scope.entityModel[$scope.fieldName] || [];

          var list = Lazy($scope.linkedEntity.data.data).map(function(item) {
            return {
              title: item.title,
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

