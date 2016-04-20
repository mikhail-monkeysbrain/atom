(function() {
  'use strict';

  describe('Navbar Directive', function() {
    var $scope,
      $compile,
      element,
      SessionService,
      EntityService = {getEntities: function() {return { then: function() {}};}},
      $authId,
      $cookies = {
        put: function(key, value, expire){$authId = value;},
        get: function () {return $authId;}
      };

    beforeEach(function() {
      module('Templates');
      module('components.navbar', function($provide) {
        $provide.value('$cookies', $cookies);
        $provide.value('EntityService', EntityService);
      });

      inject(function($rootScope, _SessionService_, _$compile_) {
        $scope = $rootScope;
        $compile = _$compile_;
        SessionService = _SessionService_;
        //EntityService = _EntityService_;

        spyOn(EntityService, 'getEntities').and.callThrough();

        element = $compile(angular.element('<div navbar></div>'))($scope);
        $scope.$digest();

      });

    });

    describe('on init', function() {

      it('calls entities', function() {
        expect(EntityService.getEntities).toHaveBeenCalled();
      });

    });

  });
})();