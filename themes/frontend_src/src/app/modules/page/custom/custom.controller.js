(function () {
  'use strict';

  angular
    .module('page')
    .controller('CustomPageCtrl', function($scope, $state, $location, EntityAPIService, $cookies) {

      var url = $location.url();
      var locale = $cookies.get('curLocale') || 'ru';

      EntityAPIService.getTextPage(url).then(function(response) {
        if(response.data.total > 0) {
          if(locale === 'en') {
            $scope.pageContent = response.data.data[0].en_content;
          } else {
            $scope.pageContent = response.data.data[0].content;
          }
        } else {
          pageNotFound();
        }
      });

      function pageNotFound() {
        if($state.get('error404') !== null) {
          $state.go('error404');
        } else {
          $state.go('app');
        }
      }

    });

})();