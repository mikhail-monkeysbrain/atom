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

          $element.find('.infoblockMenu ul').show();

          AuthService.properties().then(function(response) {
            var pages = _.clone(response.data.entities);
            $scope.pages = _.chain(pages)
              .each(function(item, entityName) {item.entityName = entityName})
              .sortBy(function(item) {return item.position; })
              .value();
          });

        }
      };
    });

})();
