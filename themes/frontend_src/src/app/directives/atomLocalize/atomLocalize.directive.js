(function() {
  'use strict';

  angular.module('directives.atomLocalize')
    .directive('atomLocalize', function($cookies, $window) {

      return {
        restrict:    'E',
        templateUrl: 'app/directives/atomLocalize/atomLocalize.html',
        link: function($scope, $element, attrs) {
          $scope.lang = $cookies.get('curLocale') || 'ru';
          changeText();

          $scope.changeLocale = function(locale) {
            if($scope.lang !== locale) {
              $scope.lang = locale;
              $cookies.put('curLocale', locale);
              changeText();
              $window.location.reload();
            }
          };

          function changeText() {
            if($scope.lang == 'en') {
              $scope.currentLocale = 'English';
            } else {
              $scope.currentLocale = 'Русский';
            }
          }

        }
      };
    });

})();

