(function() {
  'use strict';

  angular.module('atom')
    .run(function($rootScope, $state, $http, SessionService, EntityService) {
      $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from) {

        //$http.defaults.headers.common = {'Content-Type': 'application/json; charset=utf-8'};
        $rootScope.activePage = to.name;
        $rootScope.activeEntity = to.name === 'pagesList' ? 'page' : toParams.entity;

        if (window.tinyMCE) {
          window.tinyMCE.documentBaseURL = window.location.origin + '/themes/backend/scripts';
          window.tinyMCE.baseURL = window.location.origin + '/themes/backend/scripts';
        }

        if(from.name === 'logout' && to.name === 'login'
        || from.name === 'login' && to.name === 'logout') {
          return ;
        }

        if(from.name == "error500") {
          $rootScope.activePage = to.name;
          $rootScope.activeEntity = toParams.entity;
          $rootScope.hidePanels = false;
        }

        var authUrls = [ 'login', 'logout' ],
          sessionID = SessionService.getSessionID();

        if(sessionID){
          $rootScope.authorized = true;
          EntityService.getEntity('user', SessionService.getUserID()).then(function(response) {
            if(response.data.error && response.data.error.code == 403) {
              $state.go('logout');
            } else {
              $rootScope.userName = response.data.data[0].title;
            }
          }, function() {
            $state.go('logout');
          });
        }

        if (!Lazy(authUrls).contains(to.name) && !sessionID) {
          $state.go('logout');
        }

        if (sessionID && to.name === 'login') {
          $state.go('dashboard');
        }
      });
    });

})();
