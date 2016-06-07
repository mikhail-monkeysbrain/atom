(function() {
  'use strict';

  angular
    .module('components.helper')
    .service('HelperService', function() {

      var service = this;

      service.stripTags = function(str) {
        return str.replace(/<\/?[^>]+>/gi, '');
      };

      return service;

    });
})();
