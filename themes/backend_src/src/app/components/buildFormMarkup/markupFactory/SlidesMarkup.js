function SlidesMarkup(data) {
    var disabled = ((typeof data.disabled !== "undefined" && data.disabled == true) || data.readonly)?' disabled ':' ';
    return {
        markup : [
            '<label for="'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>',
            '<div class="col-sm-10 slides-item" data-ng-class="{\'pull-right\': $index > 0}" data-ng-repeat="tileSlid in form.'+data.name+'">',
                '<input ' +disabled+ ' type="file" data-index="{{$index}}" title="Выберите файл"   onchange="angular.element(this).scope().changeFile(this)"  data-file-upload class="btn-primary" data-ng-model="tileSlid.path">',
                '<img class="image-link" data-ng-if="tileSlid.route" style="width:30px; margin-left: 18px;" data-ng-src="{{tileSlid.route}}"/>',
                '<img class="image-link" data-ng-if="!tileSlid.route" style="width:30px; margin-left: 18px;" data-ng-src="http://placehold.it/30x30"/>',
                '<label  title="Видимость" class="switch" style="position: relative; top: 10px; left: 10px; margin-right: 10px;"><input data-ng-model="tileSlid.status"  type="checkbox" ><i></i></label>',
            '<a data-ng-hide="$first" data-ng-click="remTileSlide($index);" title="Удалить" href="javascript:;" style="margin-left: 10px;" class="btn-icon btn-icon-sm bg-danger"><i class="glyphicon glyphicon-minus"></i></a>',
            '<a data-ng-show="$last" data-ng-click="addTileSlide();" title="Добавить" href="javascript:;" style="margin-left: 10px; " class="btn-icon btn-icon-sm bg-info"><i class="glyphicon glyphicon-plus"></i></a>',
            '</div>'
        ].join(''),
        callback: function (wrapper){
            return true;
        }
    };
}