(function() {
  'use strict';

  describe('session service', function() {
    var $scope,
      SessionService,
      $authId,
      $cookies = {
        put: function(key, value, expire){$authId = value;},
        get: function () {return $authId;}
      };

    beforeEach(function() {

      module('components.session', function ($provide) {
        $provide.value('$cookies', $cookies);
      });

      inject(function($rootScope, _SessionService_) {
        $scope = $rootScope;
        SessionService = _SessionService_;

        spyOn($cookies, 'put').and.callThrough();
        spyOn($cookies, 'get').and.callThrough();
      });
    });

    describe('on init', function() {
      var sourceValue = 'user_token';
      beforeEach(function() {
        SessionService.setSessionID(sourceValue);
      });

      it('calls cookie put method with params', function() {
        expect($cookies.put).toHaveBeenCalledWith('sessionId', sourceValue, jasmine.any(Object));
      });

      describe('and then gets session ID', function() {
        var savedValue;
        beforeEach(function() {
          savedValue = SessionService.getSessionID();
        });

        it('calls cookie get method', function() {
          expect($cookies.get).toHaveBeenCalledWith('sessionId');
        });

        it('returns user token', function() {
          expect(savedValue).toEqual(sourceValue);
        });
      });
    });
  });
})();
