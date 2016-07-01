(function() {
  'use strict';

  angular.module('components.entityMarkup')
    .directive('entityListMarkup',function(){
      return {
        restict: 'AE',
        scope:       {
          entity: '=',
          entityName: '=',
          field: '='
        },
        template: function() {
          return '<span ng-if="!file && !img" style="{white-space: nowrap}">{{::title}}</span><img ng-if="!file && img" ng-src="{{title}}" ng-click="openLightboxModal($event)"><a ng-if="file && !img" href="{{route}}">{{title}}</a>';
        },
        controller: function($scope, $filter, EntityService, Lightbox, HelperService) {

          switch($scope.field.type) {
            case 'date':
              $scope.title = $scope.entity ? $filter('date')($scope.entity.sec * 1000, 'dd.MM.yyyy') : '';
              break;
            case 'datetime':
              $scope.title = $scope.entity ? $filter('date')($scope.entity.sec * 1000, 'dd.MM.yyyy HH:mm') : '';
              break;
            case 'time':
              $scope.title = $scope.entity ? $filter('date')($scope.entity.sec * 1000, 'HH:mm') : '';
              break;
            case 'select':
              $scope.title =  $scope.field.values[$scope.entity];
              break;
            case 'entity':
              _.each($scope.$parent.linkedEntities[$scope.entityName], function(linkedItem) {
                if(linkedItem && $scope.entity && linkedItem.$id == $scope.entity.$id) {
                  $scope.title = linkedItem.title;
                }
              });
              break;
            case 'boolean':
              $scope.title = $scope.entity?'Да':'Нет';
              break;
            case 'image':
              $scope.title = $scope.entity && typeof $scope.entity[0] !== 'undefined' ? $scope.entity[0].route : '';
              $scope.img = true;
              break;
            case 'file':
              $scope.title = $scope.entity && typeof $scope.entity[0] !== 'undefined' ? $scope.entity[0].title : '';
              $scope.route = $scope.entity && typeof $scope.entity[0] !== 'undefined' ? $scope.entity[0].route : '';
              $scope.file = true;
              break;
            default:
              $scope.title = HelperService.stripTags($scope.entity);
          }

          $scope.openLightboxModal = function(e) {
            Lightbox.openModal([{
              'url': e.target.src,
              'caption': '',
              'thumbUrl': '' // used only for this example
            }], 0);
          }

        }
      };
    });
})();

