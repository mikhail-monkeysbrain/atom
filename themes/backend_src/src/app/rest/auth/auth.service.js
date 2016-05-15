(function() {
  'use strict';

  angular.module('components.auth')
    .service('AuthService', function($http, $httpParamSerializer, $q, baseURL) {

      var service = this;
      service.cache = {};

      this.logout = function() {
        return $http.get(baseURL + '/user/logout/');
      };

      this.login = function(request) {
        return $http.post(baseURL + '/user/auth/pass/', $httpParamSerializer(request));
      };

      this.properties = function() {
        if(service.cache.properties) {
          return $q.when(service.cache.properties);
        } else {
          return $http
            .get(baseURL + '/atom/properties/')
            .then(function(response) {
              service.cache.properties = response;
              return response;
            });
        }

      };
    });

})();
