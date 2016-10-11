function FileMarkup(data) {
  var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
    return {
      markup : '<label for="'+data.name+'" class="col-sm-2">'+data.title+(data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '')+'</label>'+
      '<div class="col-sm-10">'+
      '<span atom-file>'+
      '<input data-file-upload ' +disabled+ ' id="'+data.name+'" ng-model="form.'+data.name+'" name="'+data.name+'" type="file" title="Выберите файл"  class="ng-hide">'+
      (data.readonly ? '' : '<a class="file-input-wrapper btn btn-default btn-primary" ><span>Выберите файл</span></a>')+
      '</span>'+
      '<a target="_blank" ng-if="form.'+data.name+'[0].route" href="{{form.'+data.name+'[0].route}}" class="btn btn-default btn-primary" style="margin-left: 10px" ><span>Скачать файл</span></a>'+
      '</div>',
        callback: function (wrapper){
            return true;
        }
    };
}
//OLD MARKUP
//markup : '<label for="'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
//'<div class="col-sm-10" atom-file>'+
//'<input' +disabled+ 'id="'+data.name+'" type="file" title="Выберите файл"   data-file-upload class="btn-primary" data-ng-model="form.'+data.name+'">'+
//'</div>',