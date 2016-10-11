(function() {
  'use strict';

  angular.module('authorization')
    .controller('AuthorizationCtrl', function($scope, $rootScope, $state, $document, $http, $cookies, AuthService, toastr, SessionService, $stateParams, loginPeriod) {

      var yearFuther = 1000*60*60*24*365;
      $scope.rememberMe = true;

      if($state.is('logout')) {
        $rootScope.hidePanels = true;
        $rootScope.authorized = false;
        if(SessionService.getSessionID() !== undefined) {
          SessionService.setSessionID(undefined);
          $cookies.remove('token');
          $cookies.remove('rememberMe');
		  $cookies.remove('user');
          $cookies.remove('userId');
          $cookies.remove('sessionId');
          AuthService.logout();
        }
        $state.go('login');
      }

      $scope.makeLogin = function() {
        AuthService.login($scope.user)
          .then(function(response) {
            if(response.data.success) {

              $http.defaults.headers.common.Token = response.data.success.user.token;
              //return response;
              return AuthService.properties().then(function(properties) {

                return {response: response, properties: properties};
              });

            } else {
              toastr.error(response.data.error.message);
            }
          })
          .then(function(data) {
            var response = data.response;
            var homepage = data.properties.data.homepage;
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


            SessionService.setSessionID(response.data.success.user.token, loginExpirationDate);
            //$cookies.put('token', response.data.success.user.token, {path: '/'});
            SessionService.setUserID(response.data.success.user._id.$id, loginExpirationDate);

            //$http.defaults.headers.post = {'Token': response.data.success.user.token};


            toastr.success(response.data.success.message);

            $document.find('.body-wide').removeClass('body-wide').removeClass('body-lock');
            $rootScope.authorized = true;
            $rootScope.hidePanels = false;
            $rootScope.userName = response.data.success.user.name;
            $cookies.put('token', response.data.success.user.token, tokenCookieParams);
            $cookies.put('homepage', homepage, tokenCookieParams);
            $cookies.put('rememberMe', $scope.rememberMe ? 1 : 0, tokenCookieParams);
            $state.go('entitiesList', { entity: homepage });

          });
      };
    });
})();
