(function() {
  'use strict';

  angular.module('rest.auth')
    .service('AuthServiceMock', function($http) {
      this.logout = function() {
        return $http.get('/app/rest/auth/fixture/logout_success.json');
      };

      this.login = function(request) {

        var file = (request.email.indexOf('test') === 0)
          ? 'auth.json'
          : 'auth_fail.json'
          ;

        return $http.get('/app/rest/auth/fixture/' + file);
      };

      this.register = function(request) {

        var file = (request.email.indexOf('test') === 0)
            ? 'register.json'
            : 'register_fail.json'
          ;

        return $http.get('/app/rest/auth/fixture/' + file);
      };

    });
})();
