(function() {
  'use strict';

  describe('auth service', function() {
    var $scope,
      $http,
      AuthService;

    describe('with debug mode on', function() {

      beforeEach(function() {
        module('components.auth', function ($provide) {
          $provide.value('baseURL', '');
          $provide.value('debug', true);
        });

        inject(function($rootScope, _$http_, _AuthService_) {
          $http = _$http_;
          $scope = $rootScope;
          AuthService = _AuthService_;

          spyOn($http, 'get').and.callThrough();
          spyOn($http, 'post').and.callThrough();
        });

      });

      describe('on call login method with fail params', function() {

        beforeEach(function() {
          AuthService.login({email: 'failure', password: '123'});
        });

        it('calls http get', function() {
          expect($http.get).toHaveBeenCalledWith('/app/rest/auth/fixture/auth_fail.json');
        });

      });

      describe('on call login method with success params', function() {

        beforeEach(function() {
          AuthService.login({email: 'test', password: '123'});
        });

        it('calls http get', function() {
          expect($http.get).toHaveBeenCalledWith('/app/rest/auth/fixture/auth.json');
        });

      });

      describe('on call logout method', function() {

        beforeEach(function() {
          AuthService.logout();
        });

        it('calls http get', function() {
          expect($http.get).toHaveBeenCalledWith('/app/rest/auth/fixture/logout_success.json');
        });

      });
    });

    describe('with debug mode off', function() {
      beforeEach(function() {
        module('components.auth', function ($provide) {
          $provide.value('baseURL', '/atom');
          $provide.value('debug', false);
        });

        inject(function($rootScope, _$http_, _AuthService_) {
          $http = _$http_;
          $scope = $rootScope;
          AuthService = _AuthService_;

          spyOn($http, 'get').and.callThrough();
          spyOn($http, 'post').and.callThrough();
        });


      });

      describe('on call login method ', function() {

        beforeEach(function() {
          AuthService.login({email: 'test', password: '123'});
        });

        it('calls http get', function() {
          expect($http.post).toHaveBeenCalledWith('/atom/user/auth/pass/', 'email=test&password=123');
        });

      });

      describe('on call logout method', function() {

        beforeEach(function() {
          AuthService.logout();
        });

        it('calls http get', function() {
          expect($http.get).toHaveBeenCalledWith('/atom/user/logout/');
        });

      });
    });

  });
})();