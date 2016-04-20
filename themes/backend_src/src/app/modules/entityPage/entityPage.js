(function() {
  'use strict';

  angular.module('entityPage', [ ])
    .config(function($stateProvider) {

      $stateProvider
        .state('pagesList', {
          url: '/page/list',
          views: {
            'content@': {
              templateUrl:  'app/modules/entityPage/pagesList/pagesList.html',
              controller: 'PagesListCtrl'
            }
          }
        })
        .state('entitiesList', {
          url: '/:entity/list',
          views: {
            'content@': {
              templateUrl:  'app/modules/entityPage/entitiesList/entitiesList.html',
              controller: 'EntitiesListCtrl'
            }
          }
        })
        .state('entityEdit', {
          url: '/:entity/edit/:id',
          views: {
            'content@': {
              templateUrl:  'app/modules/entityPage/entityEdit/entityEdit.html',
              controller: 'EntityEditCtrl'
            }
          }
        })
        .state('entityAdd', {
          url: '/:entity/add',
          views: {
            'content@': {
              templateUrl:  'app/modules/entityPage/entityEdit/entityEdit.html',
              controller: 'EntityEditCtrl'
            }
          }
        })
        .state('entityAddPage', {
          url: '/:entity/add/:pid',
          views: {
            'content@': {
              templateUrl:  'app/modules/entityPage/entityEdit/entityEdit.html',
              controller: 'EntityEditCtrl'
            }
          }
        })
      ;
    })
  ;
})();
