(function() {
  'use strict';

  angular.module('rest.restrictionsAPI')
    .service('RestrictionsAPIServiceMock', function($http) {

      this.getRestrictions = function() {
        return $http.get('/app/rest/restrictions/fixture/restrictions.json');
      };

    });
})();
