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


          var time = $scope.field ? $scope.field.sec : 0;
          if(time) {
            $scope.dt = moment(time * 1000);
          }

          angular.element($element[0].querySelector('input')).datetimepicker({
            locale: 'ru',
            useCurrent: true,
            defaultDate: $scope.dt,
            format: format,
            extraFormats: [format ]
          });

          $element.find('input').on('blur', function () {

            var date = moment($element.find('input').val(), format);

            $scope.field = date.locale('en').format('ddd MMM DD YYYY HH:mm:ss');//Tue Dec 22 2015 00:00:00 GMT+0300//(date).toString().replace(/( \((.+)\))/g, '');
            $element.find('input').trigger('input');
          })

        }
      };
    });

})();

