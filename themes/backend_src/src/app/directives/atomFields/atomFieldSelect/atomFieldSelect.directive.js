(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomFieldSelect', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '=',
          linkedEntity: '=',
          entityModel: '='
        },
        templateUrl: 'app/directives/atomFields/atomFieldSelect/atomFieldSelect.html',
        link: function($scope) {

          var list = Lazy($scope.scheme.values).map(function(item, key) {
            return {
              title: item,
              id: key
            }
          }).toArray();

          var fields = $scope.scheme.multiple ? $scope.field : [$scope.field];

          var model = Lazy(fields).compact().map(function(fieldItem) {
            return Lazy(list).find(function(entityItem) {
              return entityItem.id === fieldItem.$id;
            })
          })
            .compact()
            .toArray();
          $scope.list = list;
          $scope.entityModel[$scope.fieldName] = $scope.scheme.multiple ? model : model[0];

        }
      };
    });

})();

