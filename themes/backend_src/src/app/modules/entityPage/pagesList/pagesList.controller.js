(function() {
  'use strict';

  angular.module('entityPage')
    .controller('PagesListCtrl', function($q, $log, $scope, $stateParams, $state, $location, EntityService, $uibModal, toastr, _) {

      var sourceArray = {};

      function splitListToTree(sourceList, resultList, rootId) {

        _.each(sourceList, function(sourceItem) {
          if(sourceItem._id.$id === 0) return;

          var pid = typeof sourceItem.pid.$id !== 'undefined' ? sourceItem.pid.$id : sourceItem.pid;

          sourceList[pid].items.push(sourceItem);
          sourceList[pid].items.sort(function(a, b) {
            return a.position - b.position;
          })

        });

        return resultList;
      }

      $scope.list = [];

      var listBackup = [];

      $scope.options = {
        dropped: function(e) {

          var toUpdate = [];
          var dndBackup = [];
          var itemData = e.source.nodeScope.$modelValue;
          var newPos = e.dest.index;
          var oldPos = e.source.index;

          var dest = e.dest.nodesScope.$nodeScope.$modelValue;
          var source = e.source.nodesScope.$nodeScope.$modelValue;

          if(newPos === oldPos && dest._id.$id === source._id.$id) return ;

          var key;
          if(itemData.pid === 0) {
            key = 0;
          } else {
            key = itemData.pid.$id;
          }
          _.each(sourceArray[key].items, function(childItem) {
            dndBackup.push({
              _id: childItem._id.$id,
              position: childItem.position,
              pid: childItem.pid.$id,
              url: childItem.url
            });
          });

          itemData.pid = dest._id;

          _.each(sourceArray[itemData.pid.$id].items, function(childItem, pos) {
            dndBackup.push({
              _id: childItem._id.$id,
              position: childItem.position,
              pid: childItem.pid.$id,
              url: childItem.url
            });

            childItem.position = pos;
            var itemUrl = childItem.url.split('/');
            childItem.url = dest.url + itemUrl[itemUrl.length - 2] + '/';


            toUpdate.push({
              _id: childItem._id.$id,
              position: childItem.position,
              pid: childItem.pid.$id,
              url: childItem.url
            });

            updateChildUrl(childItem);
          });



          var promises = [];
          _.each(toUpdate, function(updateItem) {
            promises.push(EntityService.saveEntity('page', updateItem, false, false));
          });

          $q.all(promises).then(function(responses) {
            var success = true;
            _.each(responses, function(response) {
              success = success || response.data.success
            });
            if(success) {
              toastr.success('Изменения успешно сохранены');
              listBackup = _.clone($scope.data);
            }

          }, function(response){
              _.each(response.data.error, function(item) {
                _.each(item, function(error) {
                  toastr.error(error.message);
                });
              });
            var restorePromises = [];
            _.each(dndBackup, function(updateItem) {
              restorePromises.push(EntityService.saveEntity('page', updateItem, false, false));
            });
            $q.all(restorePromises).then(function(responses){
              $scope.data = listBackup;
            });
          });


          function updateChildUrl(element) {
            _.each(element.items, function(childItem) {
              var childUrl = childItem.url.split('/');
              childItem.url = element.url + childUrl[childUrl.length - 2];

              toUpdate.push({
                _id: childItem._id.$id,
                position: childItem.position,
                pid: childItem.pid.$id,
                url: childItem.url
              });
              updateChildUrl(childItem);
            });
          }

        }
      };
      EntityService.getEntityDescription('page').then(function(schemeResponse) {

        EntityService.getEntityPage('page', 0, 0).then(function(response) {
          _.each(response.data.data, function(item) {
            item.items = [];
            sourceArray[item._id.$id] = item;
          });
          var list = {
            _id: {
              $id: 0
            },
            items: [],
            title: $location.host(),
            url: '/',
            isRoot: true
          };
          sourceArray['0'] = list;

          list = splitListToTree(sourceArray, list, 0);
          $scope.data = [list];
          listBackup = _.clone($scope.data);
          $scope.list.scheme = schemeResponse.data['page'].scheme;

        });

      });

      $scope.removeItem = function(item, remover) {
        var id = item._id.$id;
        var title = item.title;
        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/popup/popup.html',
          controller: ['$scope',function($scope) {
            $scope.title = title;
            $scope.message = 'Вы действительно хотите удалить данный элемент?';
            $scope.ok = function(){
              modalInstance.close();
              EntityService.removeEntity('page', {_id: id}).then(function() {
                toastr.success('Запись успешно удалена');
              });
              remover(item);
            };
            $scope.cancel = function(){
              modalInstance.dismiss('cancel');
            };
          }]
        });
      };

      $scope.toggle = function(item) {
        item.collapsed = !item.collapsed;
      };

      $scope.hoverIn = function() {
        this.hovered = true;
      };

      $scope.hoverOut = function() {
        this.hovered = false;
      };

    });
})();