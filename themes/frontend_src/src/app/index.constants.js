(function() {
  'use strict';

  angular
    .module('app')
    .constant('toastr', toastr)
    .constant('baseURL', '')
    .constant('debug', true)
    .constant('loginPeriod', (30*60*1000) );

})();