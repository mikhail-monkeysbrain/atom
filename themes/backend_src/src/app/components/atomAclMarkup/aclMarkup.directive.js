(function() {
  'use strict';

  angular.module('components.aclMarkup')
    .directive('aclMarkup',function(){
      return {
        restict: 'AE',
        //scope:       true,
        controller: function($scope, $q, EntityService, AuthService, _) {
          
          $q.all([
            AuthService.properties(),
            EntityService.getEntities()
          ]).then(function(responses) {

            var properties = responses[0].data.entities;
            var enitites   = responses[1].data;
            

            var allEntites = _.map(enitites, function(item, key) {
              item.name = key;
              item.position = angular.isDefined(properties[key]) ? properties[key].position : 1001;
              return item;
            });


            allEntites.unshift( {title: 'Административная панель', name: 'atom', position: 0} );
            allEntites.unshift( {title: 'Сайт', name: 'index', position: 0} );

            allEntites = _.sortBy(allEntites, function(item) {
              return item.position;
            });


            _.each(allEntites, function(item) {
              var key = item.name;
              if(typeof $scope.optionsData[$scope.key].sourceValues[key] === 'undefined'){
                $scope.optionsData[$scope.key].sourceValues[key] = {};
              }
              $scope.optionsData[$scope.key].sourceValues[key].title = item.title;
              $scope.optionsData[$scope.key].sourceValues[key].key   = key;
              $scope.optionsData[$scope.key].options.push($scope.optionsData[$scope.key].sourceValues[key]);
            });

          });
        }
      };
    });
})();

