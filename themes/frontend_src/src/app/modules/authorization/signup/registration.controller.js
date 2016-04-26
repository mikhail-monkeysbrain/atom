(function() {
  'use strict';

  angular.module('authorization')
    .controller('RegistrationCtrl', function($scope, $state, AuthService, toastr) {
      $scope.user = {};
      $scope.makeRegistration = function() {
        $scope.user.enabled = true;
        AuthService.register($scope.user).then(function(response) {

          if(response.data.success) {
            toastr.success('Вы успешно зарегистрированы');
            $state.go('login');
          } else {
            toastr.error(response.data.error.message);
          }
        },function(response) {
          if(response.data.error && response.data.error.null) {
            Lazy(response.data.error.null).each(function(error) {
              toastr.error(error.message);
            });
          }
        });
      };

    });
})();
