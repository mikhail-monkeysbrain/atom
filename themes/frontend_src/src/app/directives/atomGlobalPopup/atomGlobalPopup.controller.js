(function() {
  'use strict';

  angular.module('directives.atomGlobalPopup')
    .controller('AtomGlobalPopupCtrl', function(
      $scope,
      $uibModalInstance
    ) {


      $scope.closePopup = function() {
        $uibModalInstance.dismiss('cancel');
      };


    });
})();
