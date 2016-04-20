function IntegerMarkup(data) {
    var disabled = (typeof data.disabled !== "undefined" && data.disabled == true)?' disabled ':' ';
    var readonly = (typeof data.readonly !== "undefined" && data.readonly == true)?' readonly ':' ';
    return {
        markup: '<label for="number-'+data.name+'" class="col-sm-2">'+data.title+' '+(data.require ? '<span class="require">*</span>' : '')+'</label>'+
                '<div class="col-sm-10">'+
                    '<input ' +disabled+readonly+ ' id="number-'+data.name+'" data-ng-model="form.'+data.name+'"  type="number" class="form-control">'+
                '</div>',

        callback: function(wrapper) {
            wrapper = wrapper.find('.input-group');
            wrapper.find('.input-group-btn  button').click(function(){
                setTimeout(function(){
                    wrapper.find('input.spinner-input').trigger('change');
                },300);
            });
            return true;
        }
    };
}