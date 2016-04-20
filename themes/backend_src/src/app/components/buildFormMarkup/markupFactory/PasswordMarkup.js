function PasswordMarkup(data) {
  var disabled = (typeof data.disabled !== "undefined" && data.disabled == true)?' disabled ':' ';
  var readonly = (typeof data.readonly !== "undefined" && data.readonly == true)?' readonly ':' ';
    return {
        markup: '<label for="'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
                '<div class="col-sm-10">'+
                    '<atom-password ><div class="input-group"><input ' + disabled + readonly +' id="'+data.name+'"  autocomplete="off" type="{{atomPassword.type}}" class="form-control" data-ng-model="form.'+data.name+'">'+
                    '<span class="input-group-addon" ng-click="atomPassword.generatePassword()"><i class="glyphicon glyphicon-flash"></i></span></div></atom-password>'+
                '</div>',

        callback: function(wrapper) {
            return true;
        }
    };
}