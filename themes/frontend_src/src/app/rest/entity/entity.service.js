(function() {
  'use strict';

  angular.module('rest.entity')
    .service('EntityService', function($http, $httpParamSerializer, baseURL) {
      this.getEntities = function() {
        return $http.get(baseURL + '/atom/entities/');
      };

      this.getEntitiesList = function(entity, limit) {
        limit = limit || 0;
        return $http.get(baseURL + '/' + entity + "/?condition[enabled][$ne]=null&limit=" + limit);
      };

      this.getEntityDescription = function(entity) {
        return $http.get(baseURL + '/atom/entities/' + entity + '/');
      };

      this.getEntityPage = function(entity, page, limit, sortField, sortOrder, searchKeywords) {
        var sort = !!(sortField && sortOrder) ? '&sort[' + sortField + ']=' + sortOrder : '';
        var search = !!searchKeywords ? '&condition[$search]=' + searchKeywords : '';
        return $http.get(baseURL + '/' + entity + '/page/' + page + '/?condition[enabled][$ne]=null&limit=' + limit + sort + search);
      };

      this.getEntity = function(entity, id) {
        return $http.get(baseURL + '/' + entity + '/' + id + '/');
      };

      this.saveEntity = function(entity, data, isNew, hasFileField) {
        var saveMethod = typeof data._id === 'undefined' && isNew ? 'create' : 'update';

        if(hasFileField){
          return $http.post(baseURL + '/' + entity + '/' + saveMethod + '/', data, {headers: {
            'X-Requested-With': 'XMLHttpRequest'
            , 'Content-Type':     undefined
            , 'Accept':           'application/json'
          }} );
        } else {
          return $http.post(baseURL + '/' + entity + '/' + saveMethod + '/', $httpParamSerializer(data));
        }

      };

      this.removeEntity = function(entity, data) {
        return $http.post(baseURL + '/' + entity + '/delete/', $httpParamSerializer(data));
      };

      this.exportEntity = function(entity, data, sortField, sortOrder) {
        var condition = [];
        //var condition = 'condition[_id][$in][]=561fe8ae572b94d3358b4567&condition[_id][$in][]=5613e72e572b94274d8b4567&condition[_id][$in][]=5613e6e3572b94114d8b4567';
        if(data.length) {
          for(var i = 0; i < data.length; i++) {
            condition.push( 'condition[_id][$in][]=' + data[i]);
          }
        }
        condition = condition.join('&');
        var sort = !!(sortField && sortOrder) ? '&sort[' + sortField + ']=' + sortOrder : '';
        //return $http.get(baseURL + '/' + entity + '/export/?' + condition + sort, {
        //  headers: {'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8'}
        //});
        var anchor = angular.element('#downloadLink');
        anchor.attr({
          href: baseURL + '/' + entity + '/export/?' + condition + sort,
          target: '_self',
        })[0].click();
      };

      this.getLinkedEntities = function(entity, data) {
        var condition = [];
        var queries = [];
        if(data.length) {
          var i, j;
          for(i = 0, j = 0; i < data.length; i++, j++) {
            if (data[i]) {
              condition.push('condition[_id][$in][]=' + data[i].$id);
            }
            if(j == 19 || i == data.length-1) {
              condition = condition.join('&');
              queries.push($http.get(baseURL + '/' + entity + '/?' + condition + '&limit=0'));
              j = -1;
              condition = [];
            }
          }
        }

        return queries;
      }
    });

})();
