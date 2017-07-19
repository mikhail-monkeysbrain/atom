function ImageMarkup(data) {
  var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
    return {
        markup : '<label for="'+data.name+'" class="col-sm-2">'+data.title+(data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '')+'</label>'+
                 '<div class="col-sm-10">'+
            '<div ng-repeat="item in form.'+data.name+' track by $index" class="image-row">' +
                 '<span atom-file field="form.' + data.name + '" index="{{ $index }}">'+
                 '<input ' +disabled+ ' id="'+data.name+'" name="'+data.name+'" type="file" title="Выберите файл"  class="ng-hide">'+
                 (data.readonly ? '' : '<a class="file-input-wrapper btn btn-default btn-primary" ><span>Выберите файл</span></a>')+
                 '<img class="image-link" id="img_preview_{{ $index }}" data-ng-if="item.route" style="height:30px; margin-left: 18px;" ng-click="openLightboxModal($event)" data-ng-src="{{item.route}}"/>'+
                 '</span>'+
                 '<a target="_blank" ng-if="item.route" href="{{item.route}}" class="btn btn-default btn-primary" style="margin-left: 10px" ><span>Скачать файл</span></a>'+
                 '<atom-file-amount field="form.' + data.name + '" index="{{ $index }}"></atom-file-amount>' +
            '</div>' +
                '</div>',
        callback: function (wrapper){
            return true;
        }
    };
}

