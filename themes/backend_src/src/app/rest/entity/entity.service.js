(function() {
  'use strict';

  angular.module('components.entity')
    .service('EntityService', function($http, $httpParamSerializer, baseURL, _) {
      var service = this;
      this.getEntities = function(filter) {
        var conditions = filter ? '?condition[name]=' + filter : '';
        return $http.get(baseURL + '/atom/entities/' + conditions);
      };

      this.getEntitiesList = function(entity, limit, sort, fields) {
        limit = limit || 0;
        var fieldsFilter = fields ? '&fields[]=' + fields : '';
        var sortOrder = '';
        if(angular.isObject(sort)) {
          for(var i in sort) {
            sortOrder += '&sort[' + i + ']=' + sort[i];
          }

        }

        return $http.get(baseURL + '/' + entity + "/?condition[enabled][$ne]=null&limit=" + limit + sortOrder + fieldsFilter);
      };

      this.getEntityDescription = function(entity) {
        return service.getEntities(entity);
        //return $http.get(baseURL + '/atom/entities/' + entity + '/');
      };

      this.getEntityPage = function(entity, page, limit, sortField, sortOrder, searchKeywords, fieldsInTable, filters) {
        var sort = !!(sortField && sortOrder) ? '&sort[' + sortField + ']=' + sortOrder : '';
        var search = !!searchKeywords ? '&condition[$query]=' + searchKeywords + '&condition[ref_entity]=' + entity : '';
        var fieldsFilter = (fieldsInTable && fieldsInTable.length) ? '&' + getFieldsList(fieldsInTable).join('&') + '&fields[]=enabled' : '';

		var filterString = prepareFilters(filters);

        if(!search)
          return $http.get(baseURL + '/' + entity + '/page/' + page + '/?condition[enabled][$ne]=null&limit=' + limit + sort + fieldsFilter + filterString);
        else
          return $http.get(baseURL + '/search/page/' + page + '/?condition[enabled][$ne]=null&limit=' + limit + sort + fieldsFilter + search + filterString);
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
          return $http.post(baseURL + '/' + entity + '/' + saveMethod + '/', $.param(data));
        }

      };

      this.removeEntity = function(entity, data) {
        return $http.post(baseURL + '/' + entity + '/delete/', $httpParamSerializer(data));
      };

      this.exportEntity = function(entity, data, sortField, sortOrder, searchKeywords, filters) {
        var conditions = [];

        var filterArray = prepareExportFilters(filters);

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
        var search = !!(searchKeywords) ? angular.element('<input type="hidden" name="condition[$search]" value="' + searchKeywords + '">') : '';

        conditions = conditions.concat(filterArray);

        _.each(conditions, function(cond) {
          form.append(cond);
        });
        form.append(limit);
        form.append(sort);
        form.append(search);
        form.attr({
          action: '/' + entity + '/export/'
        })[0].submit();
      };

      this.getLinkedEntities = function(entity, fieldName, data) {
        var condition = getFieldsList(fieldName);
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
              condition = getFieldsList(fieldName);
            }
          }
        }

        return queries;
      };

      function getFieldsList(fieldsNames) {
        if(angular.isArray(fieldsNames)) {
          return _.map(fieldsNames, function(fieldName) {
            return createFieldItem(fieldName);
          })
        } else {
          return [createFieldItem(fieldsNames)];
        }
      }

      function createFieldItem(fieldName) {
        return 'fields[]=' + fieldName;
      }
		
		function prepareFilters(filter) {
            var filterString = "";
            angular.forEach(filter, function(item, key) {
                switch(item.type) {
                    case 'string':
                    case 'text':
                        filterString += '&condition[' + key + '][$regex]=' + encodeURIComponent(item.value);
                        break;
                    case 'datetime':
                    case 'time':
                    case 'date':
                    case 'integer':
                        if (key == 'datetime' && (item.value == 'Invalid date' || item.value == undefined)) {
                            item.value = null;
                        }
                        if (item.secondaryValue) {
                            if (key == 'datetime' && (item.secondaryValue == 'Invalid date' || item.secondaryValue == undefined)) {
                                item.secondaryValue = null;
                            }
                            if (item.value) {
                                filterString += '&condition[' + key + '][$gte]=' + encodeURIComponent(item.value);
                            }
                            if (item.secondaryValue) {
                                filterString += '&condition[' + key + '][$lte]=' + encodeURIComponent(item.secondaryValue)
                            }
                        } else {
                            if (item.type == 'integer') {
                                filterString += '&condition[' + key + '][$gte]=' + encodeURIComponent(item.value );
                            } else {
                                filterString += '&condition[' + key + '][$gte]=' + encodeURIComponent(item.value );
                            }
                        }
                        break;
                    case 'boolean':
                        filterString += '&condition[' + key + ']=' + encodeURIComponent(item.value);
                        break;
                    case 'entity':
                    case 'select':
                        if (angular.isArray(item.value)) {
                            angular.forEach(item.value, function (valueItem) {
                                filterString += '&condition[' + key + '][$in][]=' + encodeURIComponent(valueItem.id);
                            });
                        } else {
                            filterString += '&condition[' + key + '][$in][]=' + encodeURIComponent(item.value.id);
                        }
                        break;
                }
            });
            return filterString;
        }

        function prepareExportFilters(filter) {
            var filters = [];
            angular.forEach(filter, function(item, key) {
                switch(item.type) {
                    case 'string':
                    case 'text':
                        filters.push(angular.element('<input type="hidden" name=" condition[' + key + '][$regex]" value="' + encodeURIComponent(item.value) + '" />'));
                        break;
                    case 'datetime':
                    case 'time':
                    case 'date':
                    case 'integer':
                        if (key == 'datetime' && (item.value == 'Invalid date' || item.value == undefined)) {
                            item.value = null;
                        }
                        if (item.secondaryValue) {
                            if (key == 'datetime' && (item.secondaryValue == 'Invalid date' || item.secondaryValue == undefined)) {
                                item.secondaryValue = null;
                            }
                            if (item.value) {
                                filters.push(angular.element('<input type="hidden" name="condition[' + key + '][$gte]" value="' + encodeURIComponent(item.value) + '" />'));
                            }
                            if (item.secondaryValue) {
                                filters.push(angular.element('<input type="hidden" name="condition[' + key + '][$lte]" value="' + encodeURIComponent(item.secondaryValue) + '" />'));
                            }
                        } else {
                            if (item.type == 'integer') {
                                filters.push(angular.element('<input type="hidden" name="condition[' + key + '][$gte]" value="' + encodeURIComponent(item.value ) + '" />'));
                            } else {
                                filters.push(angular.element('<input type="hidden" name="condition[' + key + '][$gte]" value="' + encodeURIComponent(item.value ) + '" />'));
                            }
                        }
                        break;
                    case 'boolean':
                        filters.push(angular.element('<input type="hidden" name="condition[' + key + ']" value="' + encodeURIComponent(item.value) + '" />'));
                        break;
                    case 'entity':
                    case 'select':
                        angular.forEach(item.value, function(valueItem) {
                            filters.push(angular.element('<input type="hidden" name="condition[' + key + '][$in][]" value="' + encodeURIComponent(valueItem.id) + '" />'));
                        });
                        break;
                }
            });
            return filters;
        }
    });

})();
