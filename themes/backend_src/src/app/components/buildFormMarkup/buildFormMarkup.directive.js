(function() {
  'use strict';

  angular.module('components.buildFormMarkup')
    .directive('buildFormMarkup',function($compile){
      var markup = {
        restrict: 'A',
        link: function($scope, el, attr) {
          if(attr.markupData) {
            var data    = JSON.parse(attr.markupData);
            if(attr.fieldReadonly == "true") {
              data.readonly = true;
            }
            var factory = MarkupFactory(/video/i.test(data.name) ? 'video' : data.type);
            if ( (typeof window[factory] == 'function') && (markup = window[factory](data)) ) {
              el.html($compile(markup.markup)($scope));
              markup.callback(el);
            }
          }
          return true;
        }
      };
      return markup;
    });
})();

