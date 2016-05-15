(function() {
  'use strict';

  angular.module('components.auth', [])
    .config(function($provide) {
      $provide.decorator('AuthService', function($delegate, $location, AuthServiceMock, debug) {
        console.log('debug', debug);
        if (debug) {
          $delegate = AuthServiceMock;
        }
        return $delegate;
      });
    })
  ;

})();
