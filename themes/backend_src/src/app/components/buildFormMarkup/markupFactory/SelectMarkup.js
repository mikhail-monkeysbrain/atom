function SelectMarkup(data) {
    var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?'disabled':'';
    return {
        markup: '<label for="select-'+data.name+'" class="col-sm-2">'+data.title+(data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '')+'</label>'+
        '<div class="col-sm-10">'+
        '<select ' +disabled+ ' chosen no_results_text="\'Результат не найден\'" placeholder-text-multiple="\'Выберите один или несколько вариантов\'" placeholder-text-single="\'Выберите один вариант\'" ng-options="option.name for option in  optionsData.'+data.name+'.options " id="select-'+data.name+'.val" ng-model="form.'+data.name+'">'+

        '</select>'+
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