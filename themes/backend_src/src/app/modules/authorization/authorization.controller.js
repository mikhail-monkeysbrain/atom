(function() {
  'use strict';

  angular.module('authorization')
    .controller('AuthorizationCtrl', function($scope, $rootScope, $state, $document, $http, $cookies, AuthService, toastr, SessionService, $stateParams) {

      if($state.is('logout')) {
        $rootScope.hidePanels = true;
        $rootScope.authorized = false;
        if(SessionService.getSessionID() !== undefined) {
          SessionService.setSessionID(undefined);
          $cookies.remove('token');
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

            SessionService.setSessionID(response.data.success.user.token);
            $cookies.put('token', response.data.success.user.token, {path: '/'});
            SessionService.setUserID(response.data.success.user._id.$id);

            //$http.defaults.headers.post = {'Token': response.data.success.user.token};


            toastr.success(response.data.success.message);

            $document.find('.body-wide').removeClass('body-wide').removeClass('body-lock');
            $rootScope.authorized = true;
            $rootScope.hidePanels = false;
            $rootScope.userName = response.data.success.user.name;
            $cookies.put('token', response.data.success.user.token);
            $cookies.put('homepage', homepage);
            $state.go('entitiesList', { entity: homepage });

          });
      };
    });
})();
