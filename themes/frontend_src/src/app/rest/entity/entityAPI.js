(function() {
  'use strict';

  angular.module('rest.entity', [])
    .config(function($provide) {
      $provide.decorator('EntityAPIService', function($delegate, EntityAPIServiceMock, debug) {
        if (debug) {
          $delegate = EntityAPIServiceMock;
        }
        return $delegate;
      });
    })
  ;

})();
