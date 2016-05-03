(function () {
  'use strict';

  describe('RegistrationCtrl', function () {
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


  });
})();
