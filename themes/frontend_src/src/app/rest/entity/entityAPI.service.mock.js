(function() {
  'use strict';

  angular.module('rest.entity')
    .service('EntityAPIServiceMock', function($http, $httpParamSerializer) {

      this.getEntities = function() {
        return $http.get('/app/rest/entity/fixture/entities.json');
      };

      this.getEntitiesList = function(entity) {
        return $http.get('/app/rest/entity/fixture/usersList.json');
      };

      this.getEntityDescription = function(entity) {
        return $http.get('/app/rest/entity/fixture/usersDescription.json');
      };

      this.getEntityPage = function(entity, page, limit) {
        if(page === 0) {
          return $http.get('/app/rest/entity/fixture/usersPage1.json');
        } else {
          return $http.get('/app/rest/entity/fixture/usersPage2.json');
        }
      };

      this.getEntity = function(entity, id) {
        return $http.get('/app/rest/entity/fixture/userExample.json');
      };

      this.saveEntity = function(entity, data) {
        return $http.get('/app/rest/entity/fixture/userSaved.json', $httpParamSerializer(data));
      };

      this.removeEntity = function(entity, data) {
        return $http.get('/app/rest/entity/fixture/userSaved.json', $httpParamSerializer(data));
      };

      this.getTextPage = function(url) {
        if(url == '/page1') {
          return $http.get('app/rest/entity/fixture/page.json');
        } else {
          return $http.get('app/rest/entity/fixture/pageNotFound.json');
        }
      }

    });
})();
