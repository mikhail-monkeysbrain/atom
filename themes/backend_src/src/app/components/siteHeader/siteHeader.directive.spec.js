(function() {
  'use strict';

  describe('siteHeader Directive', function () {
    var element,
      $scope,
      $compile,
      $state,
      cookies = {get: angular.noop};

    beforeEach(function () {

      module('components.siteHeader', function ($provide) {
        $provide.value('$state', { go: angular.noop });
        $provide.value('$cookies', cookies);
      });

      inject(function ($rootScope, $templateCache,  _$compile_, _$state_) {
        $scope = $rootScope;
        $compile = _$compile_;
        $state = _$state_;

        $templateCache.put('app/components/siteHeader/siteHeader.html', '<header class="header nymbus-white">' +
'          <div ng-class="{' +
'        \'logo\': isAuthorized(),' +
'          \'logo-login\': !isAuthorized()' +
'      }">' +
'        <img src="assets/images/icons/logo.svg">' +
'          </div>' +
'          <h1 ng-if="isAuthorized()">Dashboard</h1>' +
'          <div class="header-options" ng-if="isAuthorized()">' +
'          <div class="search" ng-click="goToSearch()"></div>' +
'          <div class="notifications">' +
'          <span class="NotificationsCounter" ng-show="notifications">{{ notifications }}</span>' +
'      </div>' +
'      <div class="que">' +
'        <span class="QueCounter" ng-show="ques">{{ ques }}</span>' +
'    </div>' +
'    <div class="user-menu">' +
'    {{ userName }}' +
'</div>' +
'</div>' +
'</header>');

        element = $compile(angular.element('<site-header></site-header>'))($scope);
        $scope.$digest();

        spyOn($state, 'go').and.callThrough();

      });
    });

    describe('on init', function () {
      it('creates 0 notifications', function() {
        expect($scope.$$childTail.notifications).toEqual(0);
      });

      it('creates 0 ques', function() {
        expect($scope.$$childTail.ques).toEqual(0);
      });

      describe('and then run goToSearch method', function() {
        beforeEach(function() {
          $scope.$$childTail.goToSearch();
        });

        it('calls state.go', function() {
          expect($state.go).toHaveBeenCalledWith('customerSearch');
        });
      });

    });
  });
})();
