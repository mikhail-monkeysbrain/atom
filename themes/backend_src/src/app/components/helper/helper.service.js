(function() {
  'use strict';

  angular
    .module('components.helper')
    .service('HelperService', function() {

      var service = this;

      service.stripTags = function(str) {
        return str.toString().replace(/<\/?[^>]+>/gi, '');
      };

      return service;

    });
})();
