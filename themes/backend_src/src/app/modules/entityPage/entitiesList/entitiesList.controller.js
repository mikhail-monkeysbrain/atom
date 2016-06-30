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
      deviceDetector
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
      var linkedEntitiesDescription = {};

      //EntityService.getEntities().then(function(response) {
      //  $scope.exportEnabled = typeof response.data[$stateParams.entity].routes[$stateParams.entity + '.export'] !== 'undefined';
      //});

      var selectedEntityList = [];
      var lock = false;
      var linkedEntitiesList = [];
      var entityAliases = {};
      var fieldsInTable = [];
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

        $scope.list.scheme = response.data[$stateParams.entity].scheme;
        for(var field in $scope.list.scheme) {
          if($scope.list.scheme[field].sort) {
            fieldsInTable.push(field);
          }
          if($scope.list.scheme[field].search){
            $scope.hasSearchFields = true;
          }
          if($scope.list.scheme[field].type == "entity" && $scope.list.scheme[field].sort) {
            //if($scope.list.scheme[field].entity && $scope.list.scheme[field].entity.model) {
            //  linkedEntitiesList[$scope.list.scheme[field].entity.model] = [];
            //} else {
            //  linkedEntitiesList[field] = [];
            //}

            linkedEntitiesList[field] = [];
            entityAliases[field] = ($scope.list.scheme[field].entity && $scope.list.scheme[field].entity.model) ? $scope.list.scheme[field].entity.model : field;
            linkedEntitiesDescription[field] = $scope.list.scheme[field].entity || {};
          }
        }
      });

      $scope.displayData = function(page, perPage, sortField, sortOrder, searchKeywords) {
        $scope.renderData = null;
        EntityService
          .getEntityPage($stateParams.entity, page, perPage, sortField, sortOrder, searchKeywords, fieldsInTable)
          .then(function(response) {
            lock = false;
            if(response.status != 204) {
              var renderData = [];

              for(var i = 0; i < response.data.data.length; i++) {
                renderData.push(response.data.data[i]); //здесь данные вносятся не в скоуп для того, чтобы отложить рендер самой вьюхи
              }

              _.each(response.data.data, function(item) { //получаем список связанных сущностей и их $id
                _.each(_.keys(linkedEntitiesList), function(entityKey) {
                  if(typeof item[entityKey] !== "undefined") {
                    linkedEntitiesList[entityKey].push(item[entityKey]);
                  }
                });
              });
              var queries = [];
              var entityKeys = [];

              _.each(_.keys(linkedEntitiesList), function(entityKey) { //collecting promises for $q.all and appropriate keys
                if(entityKey != 'pid') {
                  var newQueries = EntityService.getLinkedEntities(entityAliases[entityKey], linkedEntitiesDescription[entityKey].field, _.uniq(linkedEntitiesList[entityKey]));
                  queries = queries.concat(newQueries);
                  for(var i = 0; i < newQueries.length; i++ ) {
                    entityKeys.push(entityKey);
                  }
                }
              });

              $q.all(queries).then(function(values) {
                values = _.zip(values, entityKeys); //joining responses and keys for iterating
                var reorderValues = [];
                _.each(values, function(item) {
                  if(reorderValues[item[1]] && reorderValues[item[1]][0].data.data) {
                    reorderValues[item[1]][0].data.data = reorderValues[item[1]][0].data.data.concat(item[0].data.data);
                  } else {
                    reorderValues[item[1]] = item;
                  }
                });

                values = [];
                for(var item in reorderValues) {
                  values.push(reorderValues[item]);
                }

                _.each(values, function(response) { //iterating responses
                  $scope.linkedEntities[response[1]] = [];
                  var entityesData = _.compact(response[0].data.data);
                  _.each(entityesData, function(responseItem) {
                    $scope.linkedEntities[response[1]].push({'$id': responseItem._id.$id, 'title': linkedEntitiesDescription[response[1]] ? responseItem[linkedEntitiesDescription[response[1]].field] : responseItem.title});
                  });
                });

                $scope.renderData = renderData;
                $scope.$broadcast('dataCountReady', response.data.total);
              });

              if(_.keys(linkedEntitiesList).length == 0) {// а если у нас нету связанных сущностей - все равно разрешаем рендер
                $scope.renderData = renderData;
              }
            } else {
              $scope.renderData = [];
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
            angular.element('section.panel div.panel-body').css('overflow-y', 'auto');
          }
        }, 500);
      }

      $scope.new = function() {
        $state.go('entityAdd', {entity: $scope.model});
      };

      $scope.setEdited = function(entity) {
        EntityService.saveEntity($stateParams.entity, {
          _id: entity._id.$id,
          enabled: entity.enabled
        }).then(function(response){
          if(response.data.success){
            toastr.success('Запись сохранена');
          }
        });
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
        EntityService.exportEntity($stateParams.entity,  selectedEntityList, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords)
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
      }

    });
})();
