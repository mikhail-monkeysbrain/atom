(function() {
  'use strict';

  angular.module('components.atomDatetimepicker')
    .directive('atomDatetimepicker', function() {

      return {
        //require: '?ngModel',
        restrict: 'AEC',
        scope: {
          pick12HourFormat: '@',
          language: '@',
          useCurrent: '@',
          location: '@',
          mode: '@',
          form: '=',
          mModel: '=',
          dataName: '@dataName',
          dataType: '@dataType'
        },
        templateUrl: 'app/components/atomDatetimepicker/atomDatetimepicker.html',
        link: function ($scope, $element, attrs) {

          var format = $scope.dataType === 'time' ? 'HH:mm' : ($scope.dataType === 'date' ? 'DD.MM.YYYY' : 'DD.MM.YYYY HH:mm');
          

          $scope.today = function() {
            $scope.dt = new Date();
            return $scope.dt;
          };



          if ($scope.form.hasOwnProperty($scope.dataName) && $scope.form[$scope.dataName]) {
            $scope.dt = moment($scope.form[$scope.dataName].sec * 1000);
          } else { $scope.today(); }


          $element.datetimepicker({
            locale: $scope.language,
            useCurrent: $scope.useCurrent,
            defaultDate: $scope.dt,
            format: format,
            extraFormats: [format ]
          });




          $element.find('input').on('blur', function () {

            var date = moment($element.find('input').val(), format);

            $scope.form[$scope.dataName] = (date).toString().replace(/( \((.+)\))/g, '');
            $element.find('input').trigger('input');
          })
        }
      };
    });

})();

