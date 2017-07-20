(function() {
  'use strict';

  angular.module('components.entityMarkup')
    .directive('entityMarkup',function(){
      return {
        restict: 'AE',
        //scope:       true,
        controller: function($scope, EntityService, _) {
          $scope.optionsData[$scope.key].options = [];
          var options = [];
          var field = $scope.field.entity.field || 'title';

          EntityService.getEntitiesList(
            $scope.optionsData[$scope.key].entity.model,
            null,
            $scope.optionsData[$scope.key].entity.sort,
            field
          ).then(function(response) {

            $scope.form[$scope.key] = [];
            _.each(response.data.data, function (item) {
              var newOption = {
                name: item[field],
                id: item._id.$id
              };
              options.push(newOption);
              if($scope.optionsData[$scope.key].multiple) {
                var optionsDataField = $scope.optionsData[$scope.key];

                if(optionsDataField.sourceValues && !angular.isArray(optionsDataField.sourceValues)) {
                  optionsDataField.sourceValues = [optionsDataField.sourceValues];
                }

                if (_.find(optionsDataField.sourceValues, function (val) {
                    return val.$id == newOption.id;
                  })) {
                  $scope.form[$scope.key].push(newOption);
                }
              } else {

                if((!$scope.optionsData[$scope.key].sourceValues || _.isEmpty($scope.optionsData[$scope.key].sourceValues)) && $scope.optionsData[$scope.key].default && $scope.optionsData[$scope.key].default.$id === newOption.id){
                  $scope.form[$scope.key] = newOption;
                }

                if($scope.optionsData[$scope.key].sourceValues && $scope.optionsData[$scope.key].sourceValues.$id == newOption.id) {
                  $scope.form[$scope.key] = newOption;
                }
              }
            });
            $scope.options = options;
          });
        }
      };
    });
})();

