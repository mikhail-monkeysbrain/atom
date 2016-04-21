(function() {
  'use strict';

  angular.module('rest.auth')
    .service('AuthService', function($http, $httpParamSerializer, baseURL) {
      this.logout = function() {
        return $http.get(baseURL + '/user/logout/');
      };

      this.login = function(request) {
        return $http.post(baseURL + '/user/auth/pass/', $httpParamSerializer(request));
      };

      this.register = function(request) {
        return $http.post(baseURL + '/user/auth/register/', $httpParamSerializer(request));
      };


      this.properties = function() {
        return $http.get(baseURL + '/atom/properties/');
      };

    });

})();
