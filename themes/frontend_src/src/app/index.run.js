(function() {
  'use strict';

  angular.module('app')
    .run(function($rootScope, $state, $http, SessionService, RestrictionsService) {

      var sessionID = SessionService.getSessionID();

      if(sessionID) {
        $rootScope.authorized = true;
      }

      $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from) {

        $rootScope.activePage = to.name;
        $rootScope.activeEntity = to.name === 'pagesList' ? 'page' : toParams.entity;

        if(from.name == "error500") {
          $rootScope.activePage = to.name;
          $rootScope.activeEntity = toParams.entity;
          $rootScope.hidePanels = false;
        }

        RestrictionsService.hasPermissions(to.name).then(function(permission) {
          if(!permission) {$state.go('app')};
        });

        var authUrls = [ 'login', 'logout' ],
          sessionID = SessionService.getSessionID();

        //if(sessionID){
        //  $rootScope.authorized = true;
        //  EntityService.getEntity('user', SessionService.getUserID()).then(function(response) {
        //    if(response.data.error && response.data.error.code == 403) {
        //      $state.go('logout');
        //    } else {
        //      $rootScope.userName = response.data.data[0].title;
        //    }
        //  }, function() {
        //    $state.go('logout');
        //  });
        //}

        if (!Lazy(authUrls).contains(to.name) && !sessionID) {
          //$state.go('logout');
        }

        if (sessionID && to.name === 'login') {
          $state.go('app');
        }
      });

    })
})();