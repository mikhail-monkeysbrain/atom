(function() {
  'use strict';

  angular.module('rest.infographic', [])
    .config(function($provide) {
      $provide.decorator('InfographicAPIService', function($delegate, InfographicAPIServiceMock, debug) {
        if (debug) {
          $delegate = InfographicAPIServiceMock;
        }
        return $delegate;
      });
    })
  ;

})();
