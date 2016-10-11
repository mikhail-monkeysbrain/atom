(function() {
  'use strict';

  angular.module('directives.atomGlobalPopup')
    .directive('atomGlobalPopup', function() {

      return {
        restrict:    'AEC',
        scope: {
          showGlobalPopup: '=',
          errorMessage: '='
        },
        controller: function($scope, $uibModal) {

        $scope.$watch('showGlobalPopup', function() {
          // console.log('showGlobalPopup', $scope.showGlobalPopup);
          if ($scope.showGlobalPopup) {
            $scope.showGlobalPopup = false;

            openDocumentPopup();
          }
        });

        function openDocumentPopup() {
          var modalInstance = $uibModal.open({
            animation:     true
            , templateUrl: 'app/directives/atomGlobalPopup/atomGlobalPopup.html'
            , windowClass: 'customModal'
            , controller:  'AtomGlobalPopupCtrl'
            , size:        'sm'
            , scope:       $scope
            , resolve:     {}
          });

          //modalInstance.result.then($scope.savePopupAction);
        }

      }
      };
    });

})();

