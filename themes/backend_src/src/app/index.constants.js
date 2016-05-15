/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('atom')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('baseURL', '')
    .constant('debug', window.location.search.indexOf('debug') !== -1)
    .constant('loginPeriod', (30*60*1000) );

})();
