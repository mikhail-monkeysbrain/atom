function UrlMarkup(data) {
  var disabled = (typeof data.disabled !== "undefined" && data.disabled == true)?' disabled ':' ';
  var readonly = (typeof data.readonly !== "undefined" && data.readonly == true)?' readonly ':' ';
  return {
    markup: '<label for="'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
    '<div class="col-sm-10">'+
    '<div class="input-group">' +
    '<span class="input-group-addon">' + '{{form.' + data.name + '.urlPrefix}}' + '</span>' +
    '<input ' +disabled+readonly+ ' id="'+data.name+'"  type="text" class="form-control" data-ng-model="form.'+data.name+'.displayUrl">'+
    '</div>' +
    '</div>',

    callback: function(wrapper) {
      return true;
    }
  };
}