(function() {
  'use strict';

  angular.module('rest.restrictionsAPI', [])
    .config(function($provide) {
      $provide.decorator('RestrictionsAPIService', function($delegate, $location, RestrictionsAPIServiceMock, debug) {
        if (debug) {
          $delegate = RestrictionsAPIServiceMock;
        }
        return $delegate;
      });
    })
  ;

})();
