(function() {
  'use strict';

  angular
    .module('components.helper')
    .service('HelperService', function($q, EntityService) {

      var service = this;

      service.stripTags = function(str) {
        return str ? str.toString().replace(/<\/?[^>]+>/gi, '') : '';
      };

      service.getLinkedEntities = function(scheme, gridViewOnly) {
        var entities = Lazy(scheme)
          .map(function(item) {
            if(item.type === 'entity' && (!gridViewOnly || (gridViewOnly && item.sort))) {
              return EntityService
                .getEntitiesList(item.entity.model, 0, 0, item.entity.field)
                .then(function(response) {
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

      return service;

    });
})();
