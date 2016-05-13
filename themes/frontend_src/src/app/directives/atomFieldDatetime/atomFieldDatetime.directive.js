(function() {
  'use strict';

  angular.module('directives.atomFieldDatetime')
    .directive('atomFieldDatetime', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '='
        },
        templateUrl: 'app/directives/atomFieldDatetime/atomFieldDatetime.html',
        link: function($scope, $element) {

          var format = $scope.scheme.type === 'time' ? 'HH:mm' : ($scope.scheme.type === 'date' ? 'DD.MM.YYYY' : 'DD.MM.YYYY HH:mm');


          $scope.today = function() {
            $scope.dt = new Date();
            return $scope.dt;
          };



          $scope.dt = moment($scope.field.sec * 1000);

          angular.element($element[0].querySelector('input')).datetimepicker({
            locale: 'ru',
            useCurrent: true,
            defaultDate: $scope.dt,
            format: format,
            extraFormats: [format ]
          });



          $scope.$watch('dt', function() {
            console.log('dt', $scope.dt);
          });

          $element.find('input').on('blur', function () {

            var date = moment($element.find('input').val(), format);

            $scope.field = (date).toString().replace(/( \((.+)\))/g, '');
            $element.find('input').trigger('input');
          })

        }
      };
    });

})();

