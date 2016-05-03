(function() {
  'use strict';

  angular.module('rest.entity', [])
    .config(function($provide) {
      $provide.decorator('EntityService', function($delegate, EntityServiceMock, debug) {
        if (debug) {
          $delegate = EntityServiceMock;
        }
        return $delegate;
      });
    })
  ;

})();
