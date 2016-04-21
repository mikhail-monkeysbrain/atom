(function () {
  'use strict';

  angular
    .module('<%= name %>', [])
    .config(function($stateProvider) {

      $stateProvider
        .state('app.<%= name %>', {
          url:      '<%= name %>',
          abstract: true
        });

      <% for(var i in permissions) { %>
      $stateProvider
        .state('app.<%= i %>', {
          url: '<%= permissions[i].pattern %>'
          , views: {
            'content@': {
              templateUrl:  'app/modules/<%= name %>/<%= permissions[i].ctrlName %>.html'
              , controller: '<%= permissions[i].ctrlName %>Ctrl'
            }
          }
        });
      <% } %>
      ;
    });

})();