function SpeedMarkup(data) {
    var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
    return {
        markup: '<label for="select-'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
                '<div class="col-sm-10">'+
                    '<span >'+
                    '<select ' +disabled+ ' class="chosen-select" data-ng-options="o for  o in speedList" data-ng-model="form.'+data.name+'">'+

                    '</select>'+
                    '</span>'+
                '</div>',

        callback: function(wrapper) {
            setTimeout(function(){
                jQuery('.chosen-select').chosen({});
            },500);
            return true;
        }
    };
}