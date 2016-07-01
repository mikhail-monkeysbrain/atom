function TextareaMarkup(data) {
  var disabled = (typeof data.disabled !== "undefined" && data.disabled == true)?' disabled ':' ';
  var readonly = (typeof data.readonly !== "undefined" && data.readonly == true)?' readonly ':' ';
  data.placeholder = data.placeholder?data.placeholder:'';
    return {
        markup: '<label for="textarea-'+data.name+'" class="col-sm-2">'+data.title+(data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '')+'</label>'+
                '<div class="col-sm-10">'+
                    '<textarea ' +disabled+readonly+ ' id="textarea-'+data.name+'" class="form-control" rows="4" placeholder="'+ data.placeholder +'" data-ng-model="form.'+data.name+'"></textarea>'+
                '</div>',

        callback: function(wrapper) {
            return true;
        }
    };
}