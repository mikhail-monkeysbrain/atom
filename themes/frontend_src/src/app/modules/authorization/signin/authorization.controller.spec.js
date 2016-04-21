(function () {
  'use strict';

  describe('AuthorizationCtrl', function () {
    var $scope,
      $state,
      $q,
      stateParams = { logout: false },
      $stateParams,
      Session = {},
      SessionService,
      $http,
      AuthService,
      toastr,
      deferred;

    beforeEach(function () {
      module('ui.router');
      module('authorization', function ($provide) {
        $provide.value('baseURL', '');
        $provide.value('debug', true);
        $provide.value('Session', Session);
        $provide.value('$stateParams', stateParams);
        $provide.value('$state', { go: angular.noop });
        $provide.value('toastr', { success: angular.noop, error: angular.noop });

        SessionService = jasmine.createSpyObj('SessionService', [ 'setSessionID' ]);
        $provide.value('SessionService', SessionService);
      });

      inject(function ($rootScope, $controller, _$state_, _$q_, _AuthService_, _$http_, _SessionService_, _$stateParams_, _toastr_) {
        $q = _$q_;
        $http = _$http_;
        $state = _$state_;
        $scope = $rootScope;
        AuthService = _AuthService_;
        SessionService = _SessionService_;
        $stateParams = _$stateParams_;
        toastr = _toastr_;

        deferred = $q.defer();
        deferred.resolve({data: {error: {message: 'Error Message'}}});

        spyOn($state, 'go').and.callThrough();
        spyOn($http, 'get').and.callThrough();
        //spyOn(AuthService, 'login').and.callThrough();
        spyOn(AuthService, 'logout').and.callThrough();
        spyOn(toastr, 'error').and.callThrough();
        spyOn(toastr, 'success').and.callThrough();
        //spyOn(SessionService, 'setSessionID').and.callThrough();

        $controller('AuthorizationCtrl', {
          $scope: $scope
        });
      });
    });

    describe('on init with login', function () {
      it('creates user with test data', function () {
        expect($scope.user).toEqual({
          email: 'admin@hismith.ru',
          password: 'multipass'
        });
      });

      describe('and then calling login function with fail data', function() {

        beforeEach(function() {
          deferred = $q.defer();
          deferred.resolve({data: {error: {message: 'Error Message'}}});//{data:{success: {user: {token: 'str'}}}}
          spyOn(AuthService, 'login').and.returnValue(deferred.promise);

          $scope.makeLogin({ email: 'me', password: '123' });
          $scope.$apply();
        });

        it('calls $http and returns fail fixture', function () {
          expect(AuthService.login).toHaveBeenCalled();
        });


        describe('and then', function() {

          //beforeEach(function() {
          //  AuthService.login({param: 1}).then(function(data) {
          //    console.log('then from test')
          //    deferred.resolve('data from response')
          //  })
          //  $scope.$apply({data: 'asdf'});
          //});

          it('calls $http and returns fail fixture', function () {
            expect(toastr.error).toHaveBeenCalled();
          });

        });
      });

      describe('and then calling login function with success data', function() {

        beforeEach(function() {
          deferred = $q.defer();
          deferred.resolve({data: {
            "success": {
              "message": "Вход выполнен",
              "user": {
                "token": "$2y$05$XJEnXG3Xi0n3eKXNe4xpYeEAFBKxd2vZaXAyAIGAm.FsNvkYw4/vq"
              }
            }
          }});
          spyOn(AuthService, 'login').and.returnValue(deferred.promise);

          $scope.makeLogin({ email: 'test@test.com', password: '123' });
          $scope.$apply();
        });

        it('calls AuthService login', function () {
          expect(AuthService.login).toHaveBeenCalled();
        });


        describe('and then', function() {

          it('calls SessionService setSessionID method', function () {
            expect(SessionService.setSessionID).toHaveBeenCalled();
          });

          it('calls toastr success method', function () {
            expect(toastr.success).toHaveBeenCalled();
          });

          it('sets $rootScope.authorized to true', function() {
            expect($scope.authorized).toBe(true);
          });

          it('calls redirect to dashboard', function() {
            expect($state.go).toHaveBeenCalledWith('dashboard');
          });

        });
      });

    });

    describe('on init with logout', function() {

      beforeAll(function() {
        $stateParams.action = 'logout';
      });

      it('unsets session ID', function () {
        expect(SessionService.setSessionID).toHaveBeenCalledWith(undefined);
      });

      it('calls logout method', function () {
        expect(AuthService.logout).toHaveBeenCalled();
      });

      it('sets $rootScope.authorized to false', function() {
        expect($scope.authorized).toBe(false);
      });

    });
  });
})();
