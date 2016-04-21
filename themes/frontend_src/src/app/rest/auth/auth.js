(function() {
  'use strict';

  angular.module('rest.auth', [])
    .config(function($provide) {
      $provide.decorator('AuthService', function($delegate, $location, AuthServiceMock, debug) {
        if (debug) {
          $delegate = AuthServiceMock;
        }
        return $delegate;
      });
    })
  ;

})();
