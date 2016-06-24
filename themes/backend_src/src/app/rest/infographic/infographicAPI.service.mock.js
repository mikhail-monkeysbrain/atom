(function() {
  'use strict';

  angular.module('rest.infographic')
    .service('InfographicAPIServiceMock', function($http) {

      var service = this;

      service.getGraphicData = function() {
        return $http.get('/app/rest/infographic/fixture/graphData.json');
      }

    });
})();
