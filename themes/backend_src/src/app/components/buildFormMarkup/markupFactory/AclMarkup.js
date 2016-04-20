function AclMarkup(data) {
  var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
  return {
    markup: '<label for="'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
    '<div class="col-sm-10">'+
    '<div class="table-responsive">'+
  '<table class="table table-striped table-bordered" acl-markup' + disabled+ '>'+
    '<thead>'+
    '<tr>'+
    '<th>#</th>'+
  '<th width="15%">Чтение</th>'+
  '<th width="15%">Создание</th>'+
  '<th width="15%">Редактирование</th>'+
  '<th width="15%">Удаление</th>'+
  '</tr>'+
  '</thead>'+
  '<tbody>'+
  '<tr ng-repeat="option in optionsData.'+data.name+'.options">'+
  '<td>{{option.title}}</td>'+
  '<td><label class="switch"><input id="read_{{ option.key }}"  type="checkbox" data-ng-model="option.read" ><i></i></label></td>'+
  '<td><label class="switch" ng-show="option.key != \'index\' && option.key != \'atom\'"><input id="create_{{ option.key }}"  type="checkbox" data-ng-model="option.create" ><i></i></label></td>'+
  '<td><label class="switch" ng-show="option.key != \'index\' && option.key != \'atom\'"><input id="update_{{ option.key }}"  type="checkbox" data-ng-model="option.update" ><i></i></label></td>'+
  '<td><label class="switch" ng-show="option.key != \'index\' && option.key != \'atom\'"><input id="delete_{{ option.key }}"  type="checkbox" data-ng-model="option.delete" ><i></i></label></td>'+
  '</tr>'+
  '</tbody>'+
  '</table>'+
  '</div>'+
    '</div>',
    callback: function(wrapper) {
      return true;
    }
  };
}