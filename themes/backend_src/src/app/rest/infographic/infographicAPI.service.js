(function() {
  'use strict';

  angular.module('rest.infographic')
    .service('InfographicAPIService', function($http, $httpParamSerializer, baseURL, _) {
      var service = this;

      service.getGraphicData = function(params) {

        var paramsList = '';

        if(params) {
          Lazy(params).each(function(value, field) {

            if(angular.isUndefined(value)) {
              return ;
            }

            if(angular.isArray(value)) {
              Lazy(value).each(function(item) {
                paramsList += '&condition[' + field + '][$in][]=' + item;
              });

            } else {
              paramsList += '&condition[' + field + ']=' + value;
            }

          });
        }

        return $http.get(baseURL
          + '/graphics/?'
          + paramsList
        );

      }
    });

})();
