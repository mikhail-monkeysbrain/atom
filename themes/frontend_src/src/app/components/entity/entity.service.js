(function() {
  'use strict';

  angular.module('components.entity')
    .service('EntityService', function($q, EntityAPIService) {
      var service = this;

      service.getLinkedEntities = function(scheme) {
        var entities = Lazy(scheme)
          .map(function(item) {
            if(item.type === 'entity') {
              return EntityAPIService.getEntitiesList(item.entity.model, 0, 0).then(function(response) {
                return {
                  entity: item.entity.model,
                  data: response.data
                };
              });
            }
          })
          .compact()
          .toArray();

        return $q.all(entities);
      };
    });

})();
