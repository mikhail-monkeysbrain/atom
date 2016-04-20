(function() {
  'use strict';

  angular.module('atom')
    .config(function($logProvider, $httpProvider, $stateProvider, toastr, SessionServiceProvider) {
      $httpProvider.defaults.headers.post = {'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'};
      $httpProvider.defaults.headers.get = {'Accept': 'application/json'};

      if(SessionServiceProvider.$get().getSessionID()) {
        $httpProvider.defaults.headers.common.Token = SessionServiceProvider.$get().getSessionID();
      }

      $httpProvider.interceptors.push(function($q, $injector, _) {
        return {
          responseError:  function(rejection) {
            if(rejection.status == 500){
              $injector.get('$rootScope').errorMessage = rejection.data.error.message;
              $injector.get('$state').go('error500');
            }
            if(rejection.status == 401) {
              $injector.get('$state').go('logout');
            } else if(rejection.status == 400) {
              if(rejection.data.error.message)
                toastr.error(rejection.data.error.message);
            } else {
              _.each(rejection.data.error.null, function(error) {
                if(error.message)
                  toastr.error(error.message);
              });
            }

            return $q.reject(rejection);
          }
        };
      });

      // Enable log
      $logProvider.debugEnabled(true);

      // Set options third-party lib
      toastr.options.timeOut = 3000;
      toastr.options.positionClass = 'toast-top-right';
      toastr.options.preventDuplicates = false;
      toastr.options.closeButton = true;
    });
})();
