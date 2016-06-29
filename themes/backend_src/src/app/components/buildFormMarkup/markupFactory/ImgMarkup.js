function ImgMarkup(data) {
  var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
    return {
        markup : '<label for="'+data.name+'" class="col-sm-2">'+data.title+(data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '')+'</label>'+
                 '<div class="col-sm-10">'+
                 '<input ' +disabled+ ' id="'+data.name+'" type="file" title="Выберите файл"   onchange="angular.element(this).scope().changeFile(this)"  data-file-upload class="btn-primary" data-ng-model="form.'+data.name+'">'+
                 '<img class="image-link" data-ng-if="form.'+data.name+'" style="height:30px; margin-left: 18px;" data-ng-src="{{form.'+data.name+'}}"/>'+
                 '</div>',
        callback: function (wrapper){
            return true;
        }
    };
}