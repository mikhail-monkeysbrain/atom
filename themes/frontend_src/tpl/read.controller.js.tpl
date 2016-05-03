(function () {
'use strict';

angular
  .module('<%= name %>')
  .controller('<%= permission.ctrlName %>Ctrl', function($scope, $stateParams, $q, EntityService, EntityAPIService) {

    var page = 0;
    var limit = 0;
    var entityName = '<%= name %>';

    $q.all([
      EntityAPIService.getEntityDescription(entityName),
      EntityAPIService.getEntity(entityName, $stateParams._id)
    ]).then(function(responses) {
      var scheme = responses[0].data['<%= name %>'].scheme;
      $scope.entityModels = {};
      $scope.entityTitle = responses[0].data['<%= name %>'].title;
      var entity = responses[1].data.data[0];

      EntityService.getLinkedEntities(scheme).then(function(responses) {

        var linkedEntities = {};
        Lazy(responses).each(function(response) {
          linkedEntities[response.entity] = response;
        });

        $scope.linkedEntities = linkedEntities;

        $scope.entity = entity;
        $scope.scheme = scheme;

      });
    });

    $scope.save = function() {

      var entityData = {
        '_id': $scope.entity._id.$id
      };


      Lazy($scope.scheme).each(function(schemeItem, fieldName) {
        if(schemeItem.type !== 'entity') {
          entityData[fieldName] = $scope.entity[fieldName]
        } else {
          Lazy($scope.entityModels[fieldName]).each(function(item, n) {
            entityData[fieldName + '[' + n + ']'] = item.id;
          });
        }
      });

      EntityAPIService.saveEntity(entityName, entityData, false);
    };

});

})();