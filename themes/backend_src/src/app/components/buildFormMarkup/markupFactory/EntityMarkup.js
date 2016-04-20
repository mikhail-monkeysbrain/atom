function EntityMarkup(data) {
  var multiple = data.multiple===true ? ' multiple ' : ' ';
  var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?'disabled':' ';

  return {
    markup: '<label for="select-'+data.name+'" class="col-sm-2">'+data.title+' '+ (data.require ? '<span class="require">*</span>' : '')+'<a ng-if="selectedEntity(\'' + data.name + '\')" href="javascript:void(0)" ng-click="openEntity(\'' + data.name +'\',' + data.multiple + ')" ><i  tooltip="Открыть в новом окне связанные элементы" tooltip-placement="top" tooltip-append-to-body="true" class="fa fa-share entity-link ' + multiple + '"></i></a></label>'+
    '<div class="col-sm-10">'+
    '<span >'+
    '<select ' + disabled+ ' chosen="{disableSearch: true}" disable-search no_results_text="\'Результат не найден\'" placeholder-text-multiple="\'Выберите один или несколько вариантов\'" placeholder-text-single="\'Выберите один вариант\'" class="form-control"  ' + multiple + ' entity-markup ng-options="option as option.name for option in  ::options track by option.id" id="select-'+data.name+'.val" ng-model="form.'+data.name+'">'+

    '</select>'+
    '</span>'+
    '</div>',

    callback: function(wrapper) {

      setTimeout(function(){
        if(disabled === 'disabled') {
          jQuery(wrapper).find('[chosen]').prop('disabled', true).trigger("chosen:updated");
        }
      },500);

      return true;
    }
  };
}
