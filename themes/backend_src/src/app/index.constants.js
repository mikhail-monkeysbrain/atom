/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('atom')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('baseURL', '')
    .constant('debug', false);

})();
