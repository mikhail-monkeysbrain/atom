function DateMarkup(data) {
    var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly);
    return {
        markup: [
            '<label for="'+data.name+'" class="col-sm-2">'+data.title+(data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '')+'</label>',
            '<div readonly="' + disabled + '" class="input-group col-sm-4" style="padding: 0 15px;" m-model="form.'+data.name+'.sec" ng-model="form.'+data.name+'.sec" atom-datetimepicker language="ru" form="form" data-data-type="' + data.type + '" data-data-name="' + data.name + '" >',
            '</div>'
        ].join(''),


        callback: function(wrapper) {
            return true;
        }
    };
}

