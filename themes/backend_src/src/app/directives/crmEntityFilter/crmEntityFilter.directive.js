(function() {
  'use strict';

  angular
    .module('directives.crmEntityFilter')
    .directive('crmEntityFilter', function() {
      return {
        restrict: 'E',
        // scope: {
        //  field: '=',
        //  fieldKey: '='
        // },
        link: function($scope, $elem) {
          $scope.$elem = $elem;
          $scope.scheme = angular.copy($scope.field);
          if($scope.scheme.type == 'entity' || $scope.scheme.type == 'select') {
            $scope.scheme.multiple = true;
          }

          var getFilterUrl = function() {
            var filterType;
            switch($scope.field.type){
              case 'string' || 'text':
                filterType = 'string';
                break;
              case 'integer':
                filterType = 'integer';
                break;
              case 'datetime' || 'date' || 'time':
                filterType = 'datetime';
                break;
              case 'boolean':
                filterType = 'boolean';
                break;
              case 'select':
                filterType = 'select';
                break;
              case 'entity' :
                filterType = 'entity';
                break;
            }
            return 'app/directives/crmEntityFilter/templates/' + filterType + 'Filter.html'
          };
          $scope.filterUrl = getFilterUrl();

        },
        template: '<div ng-include="filterUrl"></div>',
        controller: function($scope, $element) {
          $scope.model = {
            fieldValue: undefined,
            secondaryValue: undefined
          };

          $scope.entityModel = [];

          $scope.applyInterval = function (a, b) {
            $scope.interval = !!!$scope.interval;
            $scope.applyFilter(a, b);
          };

          $scope.applyFilter = function(a, b) {
            if (($scope.field.type == 'integer' && (a || b)) || $scope.field.type != 'integer') {
              var hasError = false;
              var filter;
              if ($scope.scheme.title == 'Количество проверок') {
                $scope.model.fieldValue = a;
                $scope.model.secondaryValue = b;
              }
              filter = {
                'fieldName': $scope.fieldKey,
                'type': $scope.field.type,
                'value': $scope.model.fieldValue
              };
              if ($scope.field.type == 'entity' || $scope.field.type == 'select') {
                filter.value = $scope.entityModel[$scope.fieldKey];
              }

              if (!hasError && $scope.model.secondaryValue) {//this.interval
                filter['secondaryValue'] = $scope.model.secondaryValue;
                if ($scope.field.type == 'integer') {
                  hasError = $scope.model.fieldValue > $scope.model.secondaryValue;
                } else {
                  var startDate = $scope.model.fieldValue ? {
                    d: $scope.model.fieldValue.split('.')[0],
                    M: $scope.model.fieldValue.split('.')[1],
                    y: $scope.model.fieldValue.split('.')[2].split(' ')[0]
                  } : {};
                  var endDate = $scope.model.secondaryValue ? {
                    d: $scope.model.secondaryValue.split('.')[0],
                    M: $scope.model.secondaryValue.split('.')[1],
                    y: $scope.model.secondaryValue.split('.')[2].split(' ')[0]
                  } : {};

                  if (moment(startDate).unix() > moment(endDate).unix()) {
                    toastr.error('Конечная дата меньше начальной!');
                    $scope.$emit('filter:applied', {
                      'fieldName': $scope.fieldKey,
                      'type': $scope.field.type,
                      'value': undefined,
                      'secondaryValue': undefined
                    });
                    hasError = true;
                  }
                }
              }
              if (!hasError) {
                $scope.$emit('filter:applied', filter);
              }
            }

          };

          $scope.$on('atom:changeField', function() {
            $scope.applyFilter();
          });

          $scope.$on('filter:thisReset', function (e, name) {
            if (name === $scope.fieldKey) {
              $scope.$elem.find('[chosen]').val('выберите один или несколько вариантов').trigger("chosen:updated");
              $scope.model.fieldValue = undefined;
              $scope.model.secondaryValue = undefined;
            }
          });

          $scope.$on('filter:reset', function() {
            $scope.model.fieldValue = undefined;
            $scope.model.secondaryValue = undefined;
            $scope.entityModel = {};
          })
        }
      }
    });
})();