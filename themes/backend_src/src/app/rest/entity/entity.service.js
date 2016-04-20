(function() {
  'use strict';

  angular.module('components.entity')
    .service('EntityService', function($http, $httpParamSerializer, baseURL, _) {
      var service = this;
      this.getEntities = function(filter) {
        var conditions = filter ? '?condition[name]=' + filter : '';
        return $http.get(baseURL + '/atom/entities/' + conditions);
      };

      this.getEntitiesList = function(entity, limit, sort) {
        limit = limit || 0;
        var sortOrder = '';
        if(angular.isObject(sort)) {
          for(var i in sort) {
            sortOrder += '&sort[' + i + ']=' + sort[i];
          }

        }

        return $http.get(baseURL + '/' + entity + "/?condition[enabled][$ne]=null&limit=" + limit + sortOrder);
      };

      this.getEntityDescription = function(entity) {
        return service.getEntities(entity);
        //return $http.get(baseURL + '/atom/entities/' + entity + '/');
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
        var conditions = [];
        //var condition = 'condition[_id][$in][]=561fe8ae572b94d3358b4567&condition[_id][$in][]=5613e72e572b94274d8b4567&condition[_id][$in][]=5613e6e3572b94114d8b4567';
        if(data.length) {
          for(var i = 0; i < data.length; i++) {
            conditions.push(angular.element('<input type="hidden" name="condition[_id][$in][]" value="' + data[i] + '">'));
          }
        }


        var form = angular.element('#downloadForm');
        form.html('');
        var limit = angular.element('<input type="hidden" name="limit" value="0">');
        var sort = !!(sortField && sortOrder) ? angular.element('<input type="hidden" name="sort[' + sortField + ']" value="' + sortOrder + '">') : '';
        _.each(conditions, function(cond) {
          form.append(cond);
        });
        form.append(limit);
        form.append(sort);
        form.attr({
          action: '/' + entity + '/export/'
        })[0].submit();
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
