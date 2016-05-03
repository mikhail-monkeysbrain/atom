(function() {
  'use strict';

  angular.module('components.restrictions')
    .service('RestrictionsService', function RestrictionsService($q, RestrictionsAPIService) {

      var service = this;

      this.hasPermissions = function(state) {
        return getPermissionsMap().then(function(permissionsMap) {
          var stateParts = state.split('.');

          if(stateParts.length === 1){
            return true;
          }

          var entity = stateParts[1];
          var action = stateParts[2];
          if(entity) {
            if(permissionsMap[entity]){
              return angular.isDefined(permissionsMap[entity].routes[entity + '.' + action]);
            }
          }
          return false;
        })
      };

      this.resetPermissions = function() {
        return RestrictionsAPIService.getRestrictions().then(function(response) {
          service.permissionsMap = response.data;
          return service.permissionsMap;
        });
      };


      function getPermissionsMap() {
        if(angular.isDefined(service.permissionsMap)) {
          return $q.when(service.permissionsMap);
        } else {
          return RestrictionsAPIService.getRestrictions().then(function(response) {
            service.permissionsMap = response.data;
            return service.permissionsMap;
          });
        }
      }

    });
})();
