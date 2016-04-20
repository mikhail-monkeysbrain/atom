(function() {
  'use strict';

  angular.module('components.atomDatepicker')
    .directive('atomDatepicker', function(SessionService) {

      return {
        restrict:    'A',
        controller: function($scope, $element, uibDatepickerPopupConfig) {

          var name = $element.find('input').attr('name');

          uibDatepickerPopupConfig.clearText = 'Очистить';
          uibDatepickerPopupConfig.closeText = 'Закрыть';
          uibDatepickerPopupConfig.currentText = 'Сегодня';

          $scope.today = function() {
            $scope.dt = new Date();
            return $scope.dt;
          };

          if ($scope.form.hasOwnProperty(name) && $scope.form[name]) {
            $scope.dt = new Date($scope.form[name].sec * 1000);
          } else { $scope.today(); }


          $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
            return $scope.opened;
          };

          $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
          };

          $scope.$watch('dt',function(){
            $scope.form[name] = $scope.dt.toString().replace(/( \((.+)\))/g, '');
            $scope.$emit('setDateVar',$scope.dt);
          });

          $scope.$watch('form.date',function(){
            if(!$scope.form[name]){
              $scope.today();
            }
          });

          $scope.format = 'dd.MM.yyyy';

          return $scope.format;
        }
      };
    });

})();

