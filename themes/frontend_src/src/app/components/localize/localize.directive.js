(function() {
  'use strict';

  angular.module('components.localize')
    .directive('localize', function($cookies, $window) {

      return {
        restrict:    'E',
        templateUrl: 'app/components/localize/localize.html',
        link: function($scope, $element, attrs) {
          $scope.lang = $cookies.get('curLocale') || 'en';
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

