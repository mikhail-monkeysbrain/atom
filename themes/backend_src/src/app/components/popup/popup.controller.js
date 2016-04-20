(function() {
  'use strict';

  angular.module('components.popup')
    .controller('ModalRemoveCtrl', function($scope, $stateParams, $modalInstance) {
      $scope.ok = function() {
        EntityService.removeEntity($stateParams.entity, $scope.form);
        $modalInstance.dismiss("cancel");
      };
      $scope.cancel = function() {
        $modalInstance.dismiss("cancel");
      };
    });

})();