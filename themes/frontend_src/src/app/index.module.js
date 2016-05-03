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
    'localytics.directives',

    'components.session',
    'components.restrictions',
    'components.localize',
    'components.entity',

    'directives.atomListField',
    'directives.atomFieldString',
    'directives.atomFieldPassword',
    'directives.atomFieldBoolean',
    'directives.atomFieldEntity',
    'directives.atomFieldDatetime',
    'directives.atomGlobalPopup',

    'rest.auth',
    'rest.restrictionsAPI',
    'rest.entity',


    'demo',
    'authorization',
    'page',
    'errorPage'
  ]);
})();