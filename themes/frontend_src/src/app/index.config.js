(function() {
  'use strict';

  angular.module('app')

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('app', {
          url:        '/'
        })
      ;

      $urlRouterProvider.otherwise(function($injector) {
        $injector.get('$state').go('customHandler');
      });
    })

    .config(function($translateProvider, baseURL, debug) {
      var $cookies;
      angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
        $cookies = _$cookies_;
      }]);

      var lang = $cookies.get('curLocale') || 'en';
      if(debug) {
        $translateProvider.useUrlLoader('app/rest/localize/fixture/translate_' + lang + '.json');
      } else {
        $translateProvider.useUrlLoader(baseURL + '/atom/locales/?condtition[locale]=' + lang);
      }
      $translateProvider.preferredLanguage(lang);
    })

    .config(function($locationProvider) {
      //TODO: Comment for development. There are problems with proxy in HTML5mode
      $locationProvider.html5Mode(location.hostname !== 'localhost');
    })

    .config(function($logProvider, $httpProvider, $stateProvider, toastr) {

      $httpProvider.defaults.headers.post = {'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'};
      $httpProvider.defaults.headers.get = {'Accept': 'application/json'};

      $httpProvider.interceptors.push(function($q, $injector, loginPeriod) {
        return {
          request: function(config) {
            var remember = $injector.get('$cookies').get('rememberMe');
            var token = $injector.get('$cookies').get('token');
            var homepage = $injector.get('$cookies').get('homepage');

            if(token && remember === '0') {
              var loginExpirationDate = new Date();
              loginExpirationDate.setTime( loginExpirationDate.getTime() + loginPeriod );
              var tokenCookieParams = {
                expires: loginExpirationDate,
                path: '/'
              };
              $injector.get('$cookies').put('token', token, tokenCookieParams);
              $injector.get('$cookies').put('rememberMe', token, tokenCookieParams);
              $injector.get('$cookies').put('homepage', homepage, tokenCookieParams);
            }

            return config;
          },
          response: function (response) {

            // НЕ ТРОГАТЬ!!! Распознает необработанные по каким-либо причинам BE ошибки
            if (((angular.isObject(response.data) && (response.data.data &&
                ((!response.data.data.length || !Object.keys(response.data.data).length) && response.status != 204))) &&
                !response.data.success) || (angular.isString(response.data) &&
                (response.data.indexOf('</') == -1 || response.data.indexOf('Parse error') != -1 || response.data.indexOf('Fatal error') != -1))
                && response.status !== 204 && response.data != '') {
              $injector.get('$rootScope').errorMessage = 'Произошла ошибка. Пожалуйста, повторите операцию позже.';
              $injector.get('$rootScope').showGlobalPopup = true;
            }

            return response;
          },
          responseError:  function(rejection) {

            // НЕ ТРОГАТЬ!!! Распознает неотформатированные верным образом ошибки
            if (!rejection.data.error && !rejection.data.success) {
              $injector.get('$rootScope').errorMessage = 'Произошла ошибка. Пожалуйста, повторите операцию позже.';
              $injector.get('$rootScope').showGlobalPopup = true;
            }

            if(rejection.status == 500){
              $injector.get('$rootScope').errorMessage = rejection.data.error.message;
              $injector.get('$rootScope').showGlobalPopup = true;
            }
            if(rejection.status == 401) {
              $injector.get('$state').go('logout');
            } else if(rejection.status == 400) {
              if(rejection.data.error.message)
                toastr.error(rejection.data.error.message);
            } else if(rejection.status == 404) {
              $injector.get('$rootScope').errorMessage = rejection.data.error.message;
              $injector.get('$rootScope').showGlobalPopup = true;
            } else {
              Lazy(rejection.data.error.null).each(function(error) {
                if(error.message)
                  toastr.error(error.message);
              });
            }

            return $q.reject(rejection);
          }
        };
      });

    })

    .config(function(toastr) {
      toastr.options.timeOut = 3000;
      toastr.options.positionClass = 'toast-top-right';
      toastr.options.preventDuplicates = false;
      toastr.options.closeButton = true;
    });
})();