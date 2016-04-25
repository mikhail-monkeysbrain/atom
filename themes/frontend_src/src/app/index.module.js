(function() {
  'use strict';

  angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngTouch',
    'ngCookies',
    'ngSanitize',
    'pascalprecht.translate',

    'components.session',
    'components.restrictions',
    'components.localize',

    'rest.auth',
    'rest.restrictionsAPI',
    'rest.entity',

    'demo',
    'authorization',
    'page',
    'errorPage'
  ]);
})();