(function () {
'use strict';

angular
  .module('<%= name %>')
  .controller('<%= permission.ctrlName %>Ctrl', function($scope, $q, EntityService, EntityAPIService) {

    var page = 0;
    var limit = 0;
    var entityName = '<%= name %>';

    reload();


    $scope.remove = function(_id) {
      EntityAPIService.removeEntity(entityName, {_id: _id}).then(function() {
        reload();
      });
    };

    function reload() {
      $q.all([
        EntityAPIService.getEntityDescription(entityName),
        EntityAPIService.getEntityPage(entityName, page, limit)
      ]).then(function(responses) {
        $scope.scheme = responses[0].data[entityName].scheme;
        $scope.entityTitle = responses[0].data[entityName].title;
        var entities = responses[1].data.data;

        EntityService.getLinkedEntities($scope.scheme).then(function(responses) {

          var linkedEntities = {};
          Lazy(responses).each(function(response) {
            linkedEntities[response.entity] = response;
          });

          $scope.linkedEntities = linkedEntities;

          $scope.entities = entities;
        });
      });
    }

});

})();