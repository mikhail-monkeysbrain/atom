(function() {
  'use strict';

  angular.module('components.siteHeader')
    .directive('siteHeader', function($state, SessionService) {

      return {
        restrict:    'EA',
        scope:       true,
        templateUrl: 'app/components/siteHeader/siteHeader.html',
        controller: function($scope) {
          $scope.notifications = 0;
          $scope.ques = 0;
          $scope.userName = 'Fake';
          $scope.showMenu = false;
          $scope.isAuthorized = function() {
              return !!SessionService.getSessionID();
          };
          $scope.goToSearch = function() {
            $state.go('customerSearch');
          };
        }
      };
    });

})();
