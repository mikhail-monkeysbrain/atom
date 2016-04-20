function BooleanMarkup(data) {
  var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
    return {
        markup: '<label for="'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
                '<div class="col-sm-10">'+
                    '<label class="switch"><input ' + disabled + ' id="'+data.name+'"  type="checkbox" data-ng-model="form.'+data.name+'" ><i></i></label>'+
                '</div>',
        callback: function(wrapper) {
            return true;
        }
    };
}