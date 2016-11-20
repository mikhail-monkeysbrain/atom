(function() {
  'use strict';

  angular.module('directives.atomFields')
    .directive('atomFieldDatetime', function() {

      return {
        restrict:    'A',
        scope: {
          scheme:    '=',
          fieldName: '=',
          field:     '='
        },
        templateUrl: 'app/directives/atomFields/atomFieldDatetime/atomFieldDatetime.html',
        link: function($scope, $element) {

          var format = $scope.scheme.type === 'time' ? 'HH:mm' : ($scope.scheme.type === 'date' ? 'DD.MM.YYYY' : 'DD.MM.YYYY HH:mm');


          $scope.today = function() {
            $scope.dt = new Date();
            return $scope.dt;
          };

		  var time = $scope.field && $scope.field != undefined ? $scope.field.sec : 0;
		  if(time) {

            $scope.dt = moment(time * 1000);
			$scope.field = $scope.dt.locale('en').format('ddd MMM DD YYYY HH:mm:ss');
          }

          angular.element($element[0].querySelector('.input-group')).datetimepicker({
            locale: 'ru',
            useCurrent: true,
            defaultDate: $scope.dt,
            format: format,
			keepOpen: false,
            extraFormats: [format ]
          });

          $element.find('input').on('blur', function () {
            if ($element.find('input').val()) {
              var date = moment($element.find('input').val(), 'DD.MM.YYYY HH:mm');
              $scope.$apply(function () {
                $scope.field = date.locale('en').format('DD.MM.YYYY HH:mm');
                setTimeout(function () {
                  $scope.$emit('atom:changeField', {fieldName: $scope.fieldName});
                }, 100);
              });
              $element.find('input').trigger('input');
            }
          });

          $scope.$watch('field', function (newVal, oldVal) {
            if (newVal) {
              var date = moment(newVal, 'DD.MM.YYYY HH:mm');
              angular.element($element[0].querySelector('.input-group')).data("DateTimePicker").date(date);
            }
          });

          $scope.$watch('_field', function (newVal) {
            if (newVal) {
              var date = moment($element.find('input').val(), format);
              if (date !== $scope.field && !$scope.field) {
                $element.find('input').val('')
              }
            }
          });

        }
      };
    });

})();

