(function() {
  'use strict';

  angular.module('components.atomFile')
    .directive('atomFile', function(SessionService) {

      return {
        restrict:    'A',
        scope: {
          field: '=',
          index: '@'
        },
        controller: function($scope, $element, Lightbox) {
          $element.find('a').click(function(e) {
            $element.find('input').trigger('click');
          });

          $element.find('input').change(function() {

            var files = $element.find('input')[0].files;
              $scope.field[$scope.index] = files[0];
              $scope.field[$scope.index].updateFile = true;
          });

          $scope.openLightboxModal = function(e) {
            Lightbox.openModal([{
              'url': e.target.src,
              'caption': '',
              'thumbUrl': '' // used only for this example
            }], 0);
          }

        }
      };
    });

})();

