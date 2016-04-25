(function() {
  'use strict';

  angular.module('rest.auth')
    .service('RestrictionsAPIService', function($http, $httpParamSerializer, baseURL) {

      this.getRestrictions = function() {
        return $http.get(baseURL + '/atom/entities/?fields=routes');
      };

    });

})();
