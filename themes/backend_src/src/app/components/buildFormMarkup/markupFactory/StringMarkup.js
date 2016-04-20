function StringMarkup(data) {
  var disabled = (typeof data.disabled !== "undefined" && data.disabled == true)?' readonly ':' ';
  var readonly = (typeof data.readonly !== "undefined" && data.readonly == true)?' readonly ':' ';
  data.placeholder = data.placeholder?data.placeholder:'';
    return {
        markup: '<label for="'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
                '<div class="col-sm-10">'+
                        '<input ' + disabled +readonly+ ' autocomplete="off" id="'+data.name+'" placeholder="'+ data.placeholder +'" type="text" class="form-control" data-ng-model="form.'+data.name+'">'+
                '</div>',

        callback: function(wrapper) {
            return true;
        }
    };
}