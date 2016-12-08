(function() {
  'use strict';

  angular.module('entityPage')
    .controller('EntitiesListCtrl', function(
      $log, 
      $q, 
      $scope, 
      $stateParams, 
      $state, 
      $timeout, 
      EntityService, 
      $uibModal, 
      toastr, 
      _, 
      SessionService, 
      deviceDetector,
      HelperService
    ) {

      if($stateParams.entity == 'page'){
        $state.go('pagesList');
        return ;
      }

      var pageState = SessionService.getEntityListState($stateParams.entity) || {};

      $scope.$log = $log;
      $scope.list = {};
      $scope.model = $stateParams.entity;
      $scope.remList = [];
      $scope.linkedEntities = {};
      $scope.fieldsInTable = {};

	  $scope.pageFilter = {};
      $scope.onceSelected = {};
      $scope.$on('filter:applied', function(event, filter) {
        if (filter.value || filter.secondaryValue || filter.value === 0 || filter.secondaryValue === 0 || filter.value === false) {
          $scope.searchKeywords = '';
          pageState.searchKeywords = $scope.searchKeywords;
          SessionService.setEntityListState(pageState, $stateParams.entity);
          $scope.filtered = true;
          $scope.pageFilter[filter.fieldName] = filter;
          filterPage($scope.pageFilter);
        }
      });

      $scope.editMode = {};

      var selectedEntityList = [];
      var lock = false;
      var fieldsInTable = [];
      var gridViewOnly = true;
      var linkedEntities = {};
      //текущие установленные параметры сортировки
      $scope.curSortField = pageState.curSortField;
      $scope.curSortOrder = pageState.curSortOrder;
      $scope.searchKeywords = pageState.searchKeywords;
      $scope.hasSearchFields = false;


      //метод, вызываемый вьюхой
      //в старом атоме он находился в объекте pagination, но здесь пагинация все же отделена
      $scope.order = function(key, order) {
        $scope.curSortField = key;
        $scope.curSortOrder = order;

        selectedEntityList = [];
        $scope.remList = [];

        pageState.curSortField = key;
        pageState.curSortOrder   = order;
        SessionService.setEntityListState(pageState, $stateParams.entity);
        //для обновления страницы с сортировкой оставался единственный метод - обновить вьюху, но в таком случае затираются
        //установленные параметры сортировки
        $scope.displayData(0,$scope.perPage, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords);
      };

      EntityService.getEntityDescription($stateParams.entity).then(function(response){
        $scope.exportEnabled = typeof response.data[$stateParams.entity].routes[$stateParams.entity + '.export'] !== 'undefined';
        $scope.createEnabled = typeof response.data[$stateParams.entity].routes[$stateParams.entity + '.create'] !== 'undefined';
        $scope.deleteEnabled = typeof response.data[$stateParams.entity].routes[$stateParams.entity + '.delete'] !== 'undefined';
        $scope.editEnabled   = typeof response.data[$stateParams.entity].routes[$stateParams.entity + '.update'] !== 'undefined';
        $scope.graphicsEnabled = typeof response.data[$stateParams.entity].atomgraphics !== 'undefined';

        var scheme = response.data[$stateParams.entity].scheme;


        HelperService
          .getLinkedEntities(scheme, gridViewOnly)
          .then(function(responses) {
            //TODO: Its a temporary conversion
            _.each(responses, function(item) {
              var entityName = findLinkedEntityName(scheme, item.entity);
              linkedEntities[entityName] = _.map(item.data.data, function(entityItem) {
                return {
                  $id: entityItem._id.$id,
                  title: entityItem[scheme[entityName].entity.field]
                }
              });
            });
            $scope.linkedEntities = linkedEntities;
          })
          .then(function() {
            for(var field in scheme) {
              if(scheme[field].sort) {
                fieldsInTable.push(field);
                if(field !== 'enabled')
                  $scope.fieldsInTable[field] = scheme[field];
              }
              if(scheme[field].search){
                $scope.hasSearchFields = true;
              }
            }
            $scope.list.scheme = scheme;
          });
      });

      function findLinkedEntityName(scheme, fieldName) {
        var entityName = '';
        _.find(scheme, function(schemeItem, key) {
          entityName = key;
          return schemeItem.type === 'entity' && schemeItem.entity.model === fieldName;
        });

        return entityName;
      }


      $scope.displayData = function(page, perPage, sortField, sortOrder, searchKeywords, filters) {
        $scope.renderData = null;
        EntityService
          .getEntityPage($stateParams.entity, page, perPage, sortField, sortOrder, searchKeywords, fieldsInTable, filters)
          .then(function(response) {
            lock = false;
            if(response.status != 204) {
              var renderData = [];

              for(var i = 0; i < response.data.data.length; i++) {
                renderData.push(response.data.data[i]); //здесь данные вносятся не в скоуп для того, чтобы отложить рендер самой вьюхи
              }

              $scope.entityTotal = response.data.total;
              $scope.$broadcast('dataCountReady', response.data.total);
              $timeout(function () {
                $scope.renderData = renderData;
				$scope.noData = false;
              });
            } else {
              $scope.entityTotal = 0;
              $scope.renderData = [];
              $scope.noData = true;
              $scope.$broadcast('dataCountReady', 0);
            }
          });
      };

      $scope.$on('dataCountReady', resizeTable);

      angular.element(window).resize(resizeTable);


      function resizeTable() {
        $timeout(function() {
          var resizeRequired = false;
          if(deviceDetector.browser == "safari") {
            resizeRequired = angular.element('#content div.panel-body').outerWidth() > angular.element('section.table-flip-scroll').width()
          } else {
            resizeRequired = angular.element('#content table').width() > angular.element('section.table-flip-scroll').width()
          }
          if(resizeRequired) {

            angular.element('section.panel div.panel-body').css('max-height',
              angular.element(window).height() -
              (angular.element('#header').height()
              + (angular.element('div.page').innerHeight() - angular.element('div.page').height() -110)
              + angular.element('div.panel-heading').outerHeight(true)
              + angular.element('div.table-filters').outerHeight(true)
              + angular.element('footer.table-footer').outerHeight(true))
              + 'px');
            angular.element('section.panel div.panel-body table, section.panel div.panel-body section').css('max-height',
                angular.element(window).height() -
                (angular.element('#header').height()
                + (angular.element('div.page').innerHeight() - angular.element('div.page').height() -110)
                + angular.element('div.panel-heading').outerHeight(true)
                + angular.element('div.table-filters').outerHeight(true)
                + angular.element('footer.table-footer').outerHeight(true))
                - 20 + 'px');
          }
        }, 500);
      }

      $scope.new = function() {
        $state.go('entityAdd', {entity: $scope.model});
      };

      $scope.setEdited = function(entity, field) {
        if (field) {
          var editedObj = {
            _id: entity._id.$id
          };
          editedObj[field] = entity[field];
          EntityService.saveEntity($stateParams.entity, editedObj).then(function(response){
            if(response.data.success){
              toastr.success('Запись сохранена');
            }
          });
        } else {
          EntityService.saveEntity($stateParams.entity, {
            _id: entity._id.$id,
            enabled: entity.enabled
          }).then(function(response){
            if(response.data.success){
              toastr.success('Запись сохранена');
            }
          });
        }
      };

      $scope.selectAllItems = function($event) {
        $scope.remList = [];
        var element    = angular.element($event.currentTarget);
        var table = element.closest('table');
        table.find('tbody input[type="checkbox"].remBox').prop('checked',element.is(':checked'));
        if($event.currentTarget.checked == true) {
          angular.forEach(table.find('tbody input[type="checkbox"].remBox'),function(input){
            $scope.remList.push(input.value);
          });
        } else {
          $scope.remList = [];
        }
        selectedEntityList = $scope.remList;
      };

      $scope.updateRemItems = function($event) {
        if($event.currentTarget.checked === false) {
          var index = _.indexOf($scope.remList, $event.currentTarget.value);
          if(index > -1) {
            $scope.remList.splice(index, 1);
          }
        } else {
          $scope.remList.push($event.currentTarget.value);
        }
        selectedEntityList = $scope.remList;
      };

      $scope.isSelectItems = function() {
        return $scope.remList.length === 0;
      };

      $scope.exportStack = function() {
        EntityService.exportEntity($stateParams.entity,  selectedEntityList, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords, $scope.pageFilter)
      };

      $scope.deleteStack = function (id) {
        var elementsList = $scope.renderData;
        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/popup/popup.html',
          controller: ['$scope', function($scope) {
            var elementsToRemove = id ? [id] : selectedEntityList;

            if(elementsToRemove.length > 1) {
              $scope.title = 'Всего выбрано элементов: ' + elementsToRemove.length;
            } else {
              var el = _.find(elementsList, function(element) {
                return element._id.$id == elementsToRemove[0];
              });
              $scope.title = el.title || null;
            }

            $scope.message = elementsToRemove.length > 1 ? 'Вы действительно хотите удалить данные элементы?' : 'Вы действительно хотите удалить данный элемент?';
            $scope.ok = function(){
              modalInstance.close();
              _.each(elementsToRemove, function(element) {
                EntityService.removeEntity($stateParams.entity, {_id: element}).then(function() {
                  toastr.success('Запись успешно удалена');
                  $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                  });
                });
              });
            };
            $scope.cancel = function(){
              modalInstance.dismiss('cancel');
            };
          }]
        });

      };


      $scope.search = function() {
          pageState.searchKeywords = $scope.searchKeywords;
          SessionService.setEntityListState(pageState, $stateParams.entity);
          $scope.filtered = false;
          $scope.pageFilter = {};
          Object.keys($scope.editMode).forEach(function(key) {
            $scope.editMode[key] = false;
          });
          $scope.$broadcast('filter:reset');
          $scope.displayData(0,$scope.perPage, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords);
      };

      $scope.keyUpHandler = function(event) {
        if(event.keyCode === 13) {
          $scope.search();
        }
      };

      $scope.goToGraphic = function() {
        if(selectedEntityList) {
          SessionService.saveSelectedItems(selectedEntityList);
        }
        $state.go('infographic', {entity: $stateParams.entity});
      };

      $scope.isRendered = function () {
        return !!angular.element('.fieldCell').first().text() || $scope.noData;
      };

	  $scope.resetFilterByKey = function(fieldKey) {
        delete $scope.pageFilter[fieldKey];
        if (Object.keys($scope.pageFilter).length < 1) {
          $scope.filtered = false;
        }
        $scope.$broadcast('filter:thisReset', fieldKey);
        $scope.editMode[fieldKey] = false;
        $scope.displayData(0,$scope.perPage, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords, {});
      };

      $scope.resetFilter = function() {
        $scope.filtered = false;
        $scope.pageFilter = {};
        Object.keys($scope.editMode).forEach(function(key) {
          $scope.editMode[key] = false;
        });
        $scope.displayData(0,$scope.perPage, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords, {});
        $scope.$broadcast('filter:reset');
      };

      $scope.showFilter = function (fieldKey) {
        $scope.editMode[fieldKey] = true;
        $scope.onceSelected[fieldKey] = true;
        $timeout(function () {
          angular.element('[chosen]').trigger("chosen:updated");
        }, 100);
      };

      function filterPage (filters) {
        pageState.searchKeywords = $scope.searchKeywords;
        SessionService.setEntityListState(pageState, $stateParams.entity);
        $scope.displayData(0,$scope.perPage, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords, filters);
      }
    });
})();
