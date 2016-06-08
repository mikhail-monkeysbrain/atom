(function() {
  'use strict';

  angular.module('entityPage')
    .controller('EntityEditCtrl', function($scope, $state, $stateParams, $uibModal, $window, $q, $timeout, EntityService, AuthService, _, uiTinymceConfig, toastr, $cookies) {
      var baseForm = {};

      $scope.form = {};
      $scope.entity = $stateParams.entity;
      $scope.isNew = !$stateParams.id;
      $scope.itemTitle = '';

      $window.jQuery.ajaxSetup({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Token', $cookies.get('token'));
        }
      });


      uiTinymceConfig = _.extend(uiTinymceConfig,{
        height: 300,
        menubar : false,
        language: 'ru',
        plugins: [
          "code,table advlist autolink link image lists charmap print preview hr anchor pagebreak ",
          "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
          " contextmenu directionality emoticons paste textcolor "
          + "responsivefilemanager"
        ],
        convert_urls: false,
        relative_urls: true,

        //toolbar1: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | styleselect| filemanager | image media | table link",
        toolbar1: "formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | table | styleselect| link unlink filemanager | image media | code ",
        valid_elements: "*[*]",
        image_advtab: true ,
        external_filemanager_path: '/atom/filemanager/',
        external_plugins: { "filemanager" : "/themes/backend/filemanager/plugin.min.js"},
        filemanager_title:"Файловый менеджер"

      });

      angular.element(window).resize(resizeFileManager);


      function resizeFileManager() {
        if(angular.element('.mce-container.mce-panel.mce-floatpanel.mce-window.mce-in:eq(1)').length === 0) {
          return ;
        }
        $timeout(function() {
          var width = angular.element(window).width() - 30;
          if(width > 1270) {
            width = 1270;
          }
          angular.element('.mce-container.mce-panel.mce-floatpanel.mce-window.mce-in:eq(1)')
            .css('width', width)
            .css('left', 15);
          angular.element('.mce-container-body.mce-window-body.mce-abs-layout:eq(1)').css('width', '100%');
        }, 250);
      }

      $q.all([
        AuthService.properties(),
        EntityService.getEntityDescription($stateParams.entity)
      ])
      .then(function(responses) {
        var response = responses[1];
        var properties = responses[0].data.entities[$stateParams.entity];
        $scope.updateEnabled = typeof response.data[$stateParams.entity].routes[$stateParams.entity + '.update'] !== 'undefined';
        $scope.deleteEnabled = typeof response.data[$stateParams.entity].routes[$stateParams.entity + '.delete'] !== 'undefined';

        var fields = response.data[$stateParams.entity].scheme;
        $scope.backend = {}; //TODO: Temporary fix for tabs
        $scope.backend.tabs = properties.tabs || {};

        var tabs = {};

        _.each(fields, function(item) {
          if(typeof item.tab === 'undefined'){
            item.tab = setDefaultTab();
          }

          if(typeof $scope.backend.tabs[item.tab] === 'undefined'){
            $scope.backend.tabs[item.tab] = item.tab;
          }
        });
        _.each($scope.backend.tabs, function(value, key) {
          _.each(fields, function(item) {
            if(item.tab === key) {
              tabs[item.tab] = $scope.backend.tabs[item.tab];
            }
          });
        });

        function setDefaultTab() {
          var defaultTab = typeof $scope.backend.tabs.main === 'undefined' ? 'default' : 'main';
          if(defaultTab === 'default') {
            $scope.backend.tabs[defaultTab] = 'Основное';

            tabs[defaultTab] = 'Основное';
          }
          return defaultTab;
        }

        $scope.tabsCount = _.keys(tabs).length;
        $scope.tabs = tabs;

        if($stateParams.id){
          EntityService.getEntity($stateParams.entity, $stateParams.id).then(function(response) {
            $scope.form = {};
            $scope.optionsData = {};
            _.each(fields, function(item, key) {
              if(item.type == 'select' || item.type == 'entity' || item.type == 'acl') {
                $scope.optionsData[key] = item;
                $scope.optionsData[key].options = [];
                $scope.form[key] = item.multiple ? [] : null;

                if (item.type == 'select') {
                  _.each(item.values, function (value, id) {
                    var newOption = {name: value, id: id};
                    $scope.optionsData[key].options.push(newOption);
                    if (id == response.data.data[0][key]) {
                      if (item.multiple) {
                        $scope.form[key].push(newOption);
                      } else {
                        $scope.form[key] = newOption;
                      }
                    }
                  });
                } else {
                  $scope.optionsData[key].sourceValues = response.data.data[0][key];
                }
              } else {
                $scope.form[key] = response.data.data[0][key];
              }

              item.name = key;
            });
            $scope.formSchema = fields;

            _.each($scope.formSchema, function(item, key) {
              if(typeof $scope.form[key] === "undefined") {
                $scope.form[key] = item.default;
              } else if(typeof $scope.form[key] === "undefined" && item.type == "select") {
                _.each(item.values, function(value, id) {
                  var newOption = {name: value, id: id};
                  $scope.optionsData[key].options.push(newOption);
                  if(id == response.data.data[0][key]){
                    if(item.multiple){
                      $scope.form[key].push(newOption);
                    } else {
                      $scope.form[key] = newOption;
                    }
                  }
                });
              }
              if(item.type == 'url') {
                var url = $scope.form[key];
                var title = $scope.form['title']
                var urlParts = url.split('/');
                var urlPrefix = url.substring(0, url.length - urlParts[urlParts.length - 2].length - 1);
                var displayUrl = urlParts[urlParts.length - 2];
                $scope.form[key] = {'urlPrefix': urlPrefix, 'displayUrl': displayUrl};
              }
            });

            baseForm = _.clone($scope.form);
            $scope.itemTitle = $scope.form.title;
          });
        }else{
          $scope.optionsData = {};
          _.each(fields, function(item, key) {
            if(item.type === 'boolean') {
              if(typeof item.default !== "undefined") {
                $scope.form[key] = item.default;
              } else {
                $scope.form[key] = false;
              }
            } else if(item.type === 'entity' || item.type === 'select' || item.type == 'acl') {
              $scope.optionsData[key] = item;
              $scope.optionsData[key].options = [];
              $scope.optionsData[key].sourceValues = {};
              $scope.form[key] = item.multiple ? [] : null;
              if(item.type == 'select'){
                _.each(item.values, function(value, id) {
                  var newOption = {name: value, id: id};
                  $scope.optionsData[key].options.push(newOption);
                  if(newOption.id == item.default) {
                    if (item.multiple) {
                      $scope.form[key].push(newOption);
                    } else {
                      $scope.form[key] = newOption;
                    }
                  }
                });
              }
            } else {
              if(typeof item.default === "undefined") {
                $scope.form[key] = null;
              } else {
                $scope.form[key] = item.default;
              }
            }

            item.name = key;
          });

          if($stateParams.pid) {
            //Its case only for page entity

            if($stateParams.pid === '0') {
              $scope.form.url = {'urlPrefix': '/', 'displayUrl': ''};
              $scope.optionsData['pid'] = fields.pid;
              $scope.optionsData['pid'].sourceValues = {$id: '0'};
              $scope.formSchema = fields;
              baseForm = _.clone($scope.form);
            }else{
              EntityService.getEntity($stateParams.entity, $stateParams.pid).then(function(parentEntityResponse) {

                $scope.form.url = {'urlPrefix': parentEntityResponse.data.data[0].url, 'displayUrl': ''};
                $scope.optionsData['pid'] = fields.pid;
                $scope.optionsData['pid'].sourceValues = parentEntityResponse.data.data[0]._id;
                $scope.formSchema = fields;
                baseForm = _.clone($scope.form);
              });
            }

          }else{
            $scope.formSchema = fields;
            baseForm = _.clone($scope.form);
          }
        }
      });


      $scope.save = function(redirect) {
        if($stateParams.id) {
          $scope.form._id = $stateParams.id;
        }
        var request = {};

        var hasFileField = !!_.findWhere($scope.formSchema, {type: 'image'}) || !!_.findWhere($scope.formSchema, {type: 'file'}) ;

        var fd = new $window.FormData();

        _.each($scope.form, function(item, key) {
          if(key != "_id" && (typeof item === "undefined" || item === null ) && $scope.formSchema[key].type !== "acl") return ;
          if (key != "_id" && ($scope.formSchema[key].type == "entity" || $scope.formSchema[key].type == "select")) {
            if($scope.formSchema[key].multiple) {
              _.each(item, function(val, n) {
                request[key + '[' + n + ']'] = val.id;
                fd.append(key + '[' + n + ']', val.id);
              });
            } else {
              if(item && typeof item.id !== 'undefined') {
                fd.append(key, item.id);
                request[key] = item.id;
              }
            }



          }else if (key != "_id" && $scope.formSchema[key].type == "acl"){
            _.each($scope.formSchema[key].options, function(opt, optKey) {
              //TODO: NEED REFACTORING
              request[key + '[' + opt.key + '][read]'] = opt.read || false;
              request[key + '[' + opt.key + '][create]'] = opt.create || false;
              request[key + '[' + opt.key + '][update]'] = opt.update || false;
              request[key + '[' + opt.key + '][delete]'] = opt.delete || false;
            });
          } else if (key != "_id" && $scope.formSchema[key].type == "image") {
            if(item && item.updateFile)
              fd.append(key, item);
          } else if (key != "_id" && $scope.formSchema[key].type == "file") {
            if(item && item.updateFile)
              fd.append(key, item);
          } else if (key != "_id" && $scope.formSchema[key].type == "url") {
            item = $scope.form[key].urlPrefix + $scope.form[key].displayUrl + '/';
            request[key] = item;
            fd.append(key, item);
          } else{
            request[key] = item;
            fd.append(key, item);
          }
        });
        EntityService.saveEntity($stateParams.entity, hasFileField ? fd : request, $scope.isNew,  hasFileField).then(function(response){
          if(response.data.success){
            toastr.success('Запись успешно сохранена');
            if(redirect) {
              $scope.goToList();
            } else {
              $scope.goToEdit(_.keys(response.data.success[0]));
            }
          }
        }, function(response) {
          _.each(response.data.error, function(item) {
            _.each(item, function(error) {
              toastr.error(error.message);
            });
          });
        });
      };

      $scope.remove = function() {
        var title = $scope.form.title || null;
        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/popup/popup.html',
          controller: ['$scope',function($scope) {
            $scope.title = title;
            $scope.message = 'Вы действительно хотите удалить данный элемент?';
            $scope.ok = function(){
              modalInstance.close();
              EntityService.removeEntity($stateParams.entity, {_id: $stateParams.id}).then(function() {
                toastr.success('Запись успешно удалена');
                $state.go('entitiesList', { entity: $stateParams.entity });
              });
            };
            $scope.cancel = function(){
              modalInstance.dismiss('cancel');
            };
          }]
        });
      };

      $scope.clear = function() {
        for(var item in $scope.form) {
          $scope.form[item] = null;
        }
      };

      $scope.rollback = function() {
        $scope.form = _.clone(baseForm);
      };

      $scope.goToList = function() {
        $state.go($stateParams.entity === 'page' ? 'pagesList' : 'entitiesList', {entity: $stateParams.entity });
      };

      $scope.goToEdit = function(id) {
        $state.go('entityEdit', {entity: $stateParams.entity, id: id});
      };

      $scope.openEntity = function(entityName, multiple) {
        var targetEntity = $scope.form[entityName];
        if(targetEntity.length !== 0) {
          var url;
          if(multiple === undefined || multiple == false) {
            url = $state.href('entityEdit', {entity: $scope.formSchema[entityName].entity.model, id: targetEntity.id}, {absolute: false});
            $window.open(location.origin + location.pathname + url);
          } else {
            _.each(targetEntity, function(item) {
              url = $state.href('entityEdit', {entity: $scope.formSchema[entityName].entity.model, id: item.id}, {absolute: false});
              $window.open(location.origin + location.pathname + url);
            });
          }
        }
      };

      $scope.selectedEntity = function(entityName) {
        return $scope.form[entityName] !== null && $scope.form[entityName].length != 0;
      };

    });
})();
