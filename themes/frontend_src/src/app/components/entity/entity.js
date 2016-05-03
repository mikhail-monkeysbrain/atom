(function() {
  'use strict';

  angular.module('components.entity', [])
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
