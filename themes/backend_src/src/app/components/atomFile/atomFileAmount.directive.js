(function() {
    'use strict';

    angular.module('components.atomFile')
        .directive('atomFileAmount', function() {

            return {
                restrict:    'AE',
                scope: {
                    field: '=',
                    index: '@'
                },
                templateUrl: 'app/components/atomFile/atomFileAmount.html',
                controller: function($scope, $element, Lightbox) {

                    $scope.add = function () {
                        $scope.field.push({});
                    };

                    $scope.remove = function () {
                        $scope.field.splice($scope.index, 1);
                        if($scope.field.length === 0) {
                            $scope.add();
                        }
                    }

                }
            };
        });

})();

