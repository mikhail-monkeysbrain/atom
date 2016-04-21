(function() {
  'use strict';

  describe('entity service', function() {
    var $scope,
      $http,
      EntityService;

    describe('run with debug mode on', function() {

      beforeEach(function() {
        module('components.entity', function ($provide) {
          $provide.value('baseURL', '');
          $provide.value('debug', true);
        });

        inject(function($rootScope, _$http_, _EntityService_) {
          $http = _$http_;
          $scope = $rootScope;
          EntityService = _EntityService_;

          spyOn($http, 'get').and.callThrough();
        });

      });

      describe('and calls getEntities method', function() {
        beforeEach(function() {
          EntityService.getEntities();
        });

        it('calls http get', function() {
          expect($http.get).toHaveBeenCalledWith('/app/rest/entity/fixture/entities.json');
        });
      });
    });

    describe('run with debug mode off', function() {

      beforeEach(function() {
        module('components.entity', function ($provide) {
          $provide.value('baseURL', '/atom');
          $provide.value('debug', false);
        });

        inject(function($rootScope, _$http_, _EntityService_) {
          $http = _$http_;
          $scope = $rootScope;
          EntityService = _EntityService_;

          spyOn($http, 'get').and.callThrough();
        });

      });

      describe('and calls getEntities method', function() {
        beforeEach(function() {
          EntityService.getEntities();
        });

        it('calls http get', function() {
          expect($http.get).toHaveBeenCalledWith('/atom/atom/entities/');
        });
      });
    });

  });
})();
