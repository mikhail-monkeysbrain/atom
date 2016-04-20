(function() {
  'use strict';

  angular.module('components.atomDatetimepicker')
    .controller('AtomDatetimepickerCtrl', function($scope, $rootScope ) {
      $scope.vm = {
        message: "Bootstrap DateTimePicker Directive",
        dateTime: {}
      };

      $scope.$watch('change', function(){
        console.log($scope.vm.dateTime);
      });


      /*
       $scope.$on('emit:dateTimePicker', function (e, value) {
       $scope.vm.dateTime = value.dateTime;
       console.log(value);
       })
       */
    });
})();
