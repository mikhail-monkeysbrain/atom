(function () {
  'use strict';

  fdescribe('DashboardCtrl', function () {
    var $scope,
      $cookies,
      $state;

    var homepage = 'user';

    beforeEach(function () {
      module('ui.router');
      module('dashboard', function ($provide) {

        $cookies = jasmine.createSpyObj('$cookies', [ 'get' ]);
        $provide.value('$cookies', $cookies);
        $state = jasmine.createSpyObj('$state', [ 'go' ]);
        $provide.value('$state', $state);

      });

      inject(function ($rootScope, $controller) {
        $scope = $rootScope;

        $state.go.and.callThrough();
        $cookies.get.and.returnValue(homepage);

        $controller('DashboardCtrl', {
          $scope: $scope
        });
      });
    });

    describe('on init', function () {

      it('get homepage from cookies', function () {
        expect($cookies.get).toHaveBeenCalledWith('homepage');
      });

      it('calls state.go ', function() {
        expect($state.go).toHaveBeenCalledWith('entitiesList', {entity: homepage})
      });

    });

  });
})();
