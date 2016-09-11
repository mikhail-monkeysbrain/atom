function VideoMarkup(data) {
  var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
    return {
      markup : '<label for="'+data.name+'" class="col-sm-2">'+data.title+(data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '')+'</label>'+
      '<div class="col-sm-10" atom-file>'+
      '<video controls height="200" style="display: block; margin-bottom: 10px;" data-ng-if="form.'+data.name+'[0].route">' +
      '<source data-ng-src="{{form.'+data.name+'[0].route}}" ' +
      'type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'/></video>'+
      '<input data-file-upload ' +disabled+ ' id="'+data.name+'" ng-model="form.'+data.name+'" name="'+data.name+'" type="file" title="Выберите файл"  class="ng-hide">'+
      '<a class="file-input-wrapper btn btn-default  btn-primary" ><span>Выберите видеофайл</span></a>'+
      '<a style="margin-left: 5px;" ng-if="form.'+data.name+'[0].route" class="btn btn-default btn-primary" href="{{form.'+data.name+'[0].route}}"><span>Скачать видеофайл</span></a>'+
      '</div>',
        callback: function (wrapper){
            return true;
        }
    };
}