(function() {
  'use strict';

  angular.module('authorization')
    .controller('AuthorizationCtrl', function(
      $scope,
      $rootScope,
      $state,
      $cookies,
      AuthService,
      toastr,
      SessionService,
      RestrictionsService,
      loginPeriod
    ) {

      var yearFuther = 1000*60*60*24*365;
      $scope.rememberMe = true;

      //TODO: FOr development
      $scope.user = location.host === 'localhost' ? {
        email: 'kamal@hismith.ru',
        password: 'multipass'
      } : {};

      if($state.is('logout')) {
        $rootScope.hidePanels = true;
        $rootScope.authorized = false;
        if(SessionService.getSessionID() !== undefined) {
          SessionService.setSessionID(undefined);
          AuthService.logout().then(function() {
            $cookies.remove('token');
            $cookies.remove('rememberMe');
            RestrictionsService.resetPermissions().then(function() {
              $state.go('app');
            });
          });
        }
        $state.go('login');
      }

      $scope.makeLogin = function() {
        AuthService.login($scope.user)
          .then(function(response) {
            if(response.data.success) {

              var loginExpirationDate = new Date();
              var tokenCookieParams = {
                path: '/'
              };

              if($scope.rememberMe) {
                loginExpirationDate.setTime( loginExpirationDate.getTime() + yearFuther );
              }else{
                loginExpirationDate.setTime( loginExpirationDate.getTime() + loginPeriod );
              }

              tokenCookieParams.expires = loginExpirationDate;


              SessionService.setSessionID(response.data.success.user.token);
              SessionService.setUserID(response.data.success.user._id.$id);
              toastr.success(response.data.success.message);

              $rootScope.authorized = true;
              $rootScope.userName = response.data.success.user.name;
              $cookies.put('token', response.data.success.user.token, tokenCookieParams);
              $cookies.put('rememberMe', $scope.rememberMe ? 1 : 0, tokenCookieParams);

              RestrictionsService.resetPermissions().then(function() {
                $state.go('app');
              });


            } else {
              toastr.error(response.data.error.message);
            }
          })

      };
    });
})();
