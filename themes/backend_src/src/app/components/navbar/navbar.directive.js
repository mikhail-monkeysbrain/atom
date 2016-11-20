(function() {
  'use strict';

  angular.module('components.navbar')
    .directive('navbar', function(SessionService) {

      return {
        restrict:       'EA',
        scope:       true,
        templateUrl: 'app/components/navbar/navbar.html',
        controller: function($scope, $state, $element, $timeout, AuthService) {

          $scope.pages = [];

          $element.find('.infoblockMenu ul').show();

          AuthService.properties().then(function(response) {
            var entities = _.clone(response.data.entities);
            var pages = _.clone(response.data.menu);
            $timeout(function () {
            $scope.pages = _.chain(pages)
              .each(function(item, entityName) {
                item.title = entityName;
                item.entities = {};
                item.links.forEach(function (link, key) {
                  item.entities[link] = entities[link];
                  item.entities[link].entityName = link;
                });
              })
              .value();
            });
          });

        }
      };
    });

})();
