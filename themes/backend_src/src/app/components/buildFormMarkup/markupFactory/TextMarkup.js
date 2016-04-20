function TextMarkup(data) {
  var disabled = (typeof data.disabled !== "undefined" && data.disabled == true)?' disabled ':' '
  var readonly = (typeof data.readonly !== "undefined" && data.readonly == true)?' readonly ':' ';
  data.placeholder = data.placeholder || '';
  return {
    markup: '<label for="text-'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
    '<div class="col-sm-10">'+
    '<textarea ' +disabled+readonly+ ' autocomplete="off" id="text-'+data.name+'" placeholder="'+ data.placeholder +'" class="form-control" rows="4" data-ng-model="form.'+data.name+'"></textarea>'+
    '</div>',

    callback: function(wrapper) {
      return true;
    }
  };
}