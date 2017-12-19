function StringMarkup(data) {
    var multiple = Boolean(data.multiple);
    var disabled = (typeof data.disabled !== "undefined" && data.disabled == true) ? ' readonly ' : ' ';
    var readonly = (typeof data.readonly !== "undefined" && data.readonly == true) ? ' readonly ' : ' ';
    data.placeholder = data.placeholder ? data.placeholder : '';
    return !multiple ? {
        markup: '<label for="' + data.name + '" class="col-sm-2">' + data.title + (data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '') + '</label>' +
        '<div class="col-sm-10">' +
        '<input ' + disabled + readonly + ' autocomplete="off" id="' + data.name + '" placeholder="' + data.placeholder + '" type="text" class="form-control" data-ng-model="form.' + data.name + '">' +
        '</div>',

        callback: function (wrapper) {
            return true;
        }
    } : {
        markup: '<label for="' + data.name + '" class="col-sm-2">' + data.title + (data.require ? '<span class="require" style="padding-left: 3px;">*</span>' : '') + '</label>' +
        '<div class="col-sm-10">' +
        '<div class="row" ng-repeat="formItem in form.' + data.name + ' track by $index">' +
        '<div class="col-sm-9"><input ' + disabled + readonly + ' autocomplete="off" ' +
        'id="form.' + data.name + '[{{$index}}]" placeholder="' + data.placeholder + '" style="margin-bottom: 5px"' +
        'type="text" class="form-control" data-ng-model="form.' + data.name + '[$index]"' +
        'ng-keypress="($event.which === 13)?pushMultipleStringElement(\'' + data.name + '\', $index):0">' +
        '</div>' +
        '<div class="col-sm-3"><div class="btn-group" role="group">' +
        '<button tooltip-append-to-body="true" uib-tooltip="опустить вниз" class="btn btn-default" ng-disabled="$index == form.' + data.name + '.length - 1" ng-click="moveMultipleStringElement(\'' + data.name + '\', $index, $index + 1)"><i class="fa fa-chevron-down"></i></button>' +
        '<button tooltip-append-to-body="true" uib-tooltip="поднять выше" class="btn btn-default" ng-disabled="!$index" ng-click="moveMultipleStringElement(\'' + data.name + '\', $index, $index - 1)"><i class="fa fa-chevron-up"></i></button>' +
        '</div> <div class="btn-group" role="group">' +
        '<button tooltip-append-to-body="true" uib-tooltip="удалить элемент" class="btn btn-default" ng-click="removeMultipleStringElement(\'' + data.name + '\', $index)"><i class="fa fa-minus"></i></button>' +
        '<button tooltip-append-to-body="true" uib-tooltip="добавить после" class="btn btn-default" ng-click="insertMultipleStringElement(\'' + data.name + '\', $index)"><i class="fa fa-plus"></i></button></div>' +
        '</div></div>' +
        '</div>',

        callback: function (wrapper) {
            return true;
        }
    };
}