(function() {
  'use strict';

  describe('DemoCtrl', function() {
    var context = this;

    beforeEach(function() {
      module('ui.router');
      module('demo', function ($provide) {

      });

      inject(function($rootScope, $controller) {
        context.$rootScope = $rootScope;
        context.$scope = $rootScope.$new();

        context.createController = function() {
          return $controller('DemoCtrl', {
            $scope: context.$scope
          });
        };
      });

    });

    describe('on init', function() {

      beforeEach(function() {
        context.createController();
      });

      it('calls foo method', function() {
        expect(context.$scope.foo).toBe('test')
      });

    });

  });
})();