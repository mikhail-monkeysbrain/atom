(function() {
  'use strict';

  angular.module('components.navbar')
    .directive('navbar', function(SessionService) {

      return {
        restrict:       'EA',
        scope:       true,
        templateUrl: 'app/components/navbar/navbar.html',
        controller: function($scope, $state, $element, AuthService) {

          $scope.pages = [];
          $scope.$state = $state;

          $element.find('.infoblockMenu ul').show();

          AuthService.properties().then(function(response) {
            var pages = _.clone(response.data.entities);
            $scope.pages = _.chain(pages)
              .each(function(item, entityName) {item.entityName = entityName})
              .sortBy(function(item) {return item.position; })
              .value();
          });

          $scope.openEntity = function (event, params) {
            event.preventDefault();
            $state.go('entitiesList', params);
          };

        }
      };
    });

})();
