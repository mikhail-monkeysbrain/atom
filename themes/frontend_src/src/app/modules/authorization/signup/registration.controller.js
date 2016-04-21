(function() {
  'use strict';

  angular.module('authorization')
    .controller('RegistrationCtrl', function($scope, $state, AuthService) {

      $scope.makeRegistration = function() {
        AuthService.register($scope.user).then(function(response) {

          if(response.data.success) {
            toastr.success(response.data.success.message);
            $state.go('login');
          } else {
            toastr.error(response.data.error.message);
          }
        });
      };

    });
})();
