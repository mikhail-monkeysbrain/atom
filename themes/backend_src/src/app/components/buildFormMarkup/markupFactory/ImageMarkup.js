function ImageMarkup(data) {
  var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
    return {
        markup : '<label for="'+data.name+'" class="col-sm-2">'+data.title+(data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '')+'</label>'+
                 '<div class="col-sm-10">'+
                 '<span atom-file>'+
                 '<input ' +disabled+ ' id="'+data.name+'" name="'+data.name+'" type="file" title="Выберите файл"  class="ng-hide">'+
                 (data.readonly ? '' : '<a class="file-input-wrapper btn btn-default btn-primary" ><span>Выберите файл</span></a>')+
                 '<img class="image-link" data-ng-if="form.'+data.name+'[0].route" style="height:30px; margin-left: 18px;" ng-click="openLightboxModal($event)" data-ng-src="{{form.'+data.name+'[0].route}}"/>'+
                 '</span>'+
                 '<a target="_blank" ng-if="form.'+data.name+'[0].route" href="{{form.'+data.name+'[0].route}}" class="btn btn-default btn-primary" style="margin-left: 10px" ><span>Скачать файл</span></a>'+
                 '</div>',
        callback: function (wrapper){
            return true;
        }
    };
}

