(function () {
'use strict';

angular
  .module('<%= name %>')
  .controller('<%= permission.ctrlName %>Ctrl', function($scope, $stateParams, $q, EntityService, EntityAPIService) {

    var page = 0;
    var limit = 0;
    var entityName = '<%= name %>';
    $scope.entity = {};

    EntityAPIService.getEntityDescription(entityName).then(function(respons) {
      var scheme = respons.data['user'].scheme;
      $scope.entityModels = {};
      $scope.entityTitle = respons.data['user'].title;

      EntityService.getLinkedEntities(scheme).then(function(responses) {

        var linkedEntities = {};
        Lazy(responses).each(function(response) {
          linkedEntities[response.entity] = response;
        });

        $scope.linkedEntities = linkedEntities;

        $scope.scheme = scheme;

      });
    });

    $scope.save = function() {

      var entityData = {};

      Lazy($scope.scheme).each(function(schemeItem, fieldName) {
        if(schemeItem.type !== 'entity') {
          entityData[fieldName] = $scope.entity[fieldName]
        } else {
          Lazy($scope.entityModels[fieldName]).each(function(item, n) {
            entityData[fieldName + '[' + n + ']'] = item.id;
          });
        }
      });

      EntityAPIService.saveEntity(entityName, entityData, true);
    };

});

})();