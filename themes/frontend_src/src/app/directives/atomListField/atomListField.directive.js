(function() {
  'use strict';

  angular.module('directives.atomListField')
    .directive('atomListField', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '=',
          linkedEntity: '='
        },
        templateUrl: 'app/directives/atomListField/atomListField.html',
        link: function($scope, $element, attrs) {
          if($scope.scheme.type === 'entity') {
            var linkedEntity = Lazy($scope.linkedEntity.data.data).find(function (item) {
              return Lazy($scope.field).findWhere({$id: item._id.$id});
            });

            var fields = $scope.scheme.multiple ? $scope.field : [$scope.field];

            var foundEntities = Lazy(fields)
              .map(function(fieldItem) {
                return Lazy($scope.linkedEntity.data.data).find(function(linkedItem) {
                  return linkedItem._id.$id === fieldItem.$id;
                } || {}).title;
              })
              .compact()
              .toArray();

            $scope.fieldLabel = foundEntities.join(', ');
          } else if($scope.scheme.type === 'date' || $scope.scheme.type === 'time' || $scope.scheme.type === 'datetime') {

            var format = $scope.scheme.type === 'time' ? 'HH:mm' : ($scope.scheme.type === 'date' ? 'DD.MM.YYYY' : 'DD.MM.YYYY HH:mm');

            $scope.fieldLabel = moment($scope.field.sec * 1000).format(format);
          } else {
            $scope.fieldLabel = $scope.field;
          }
        }
      };
    });

})();

