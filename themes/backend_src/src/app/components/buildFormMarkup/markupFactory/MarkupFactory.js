function MarkupFactory(tag) {
    if (tag) {
        if(tag === 'datetime' || tag === 'time') {
            tag = 'date';
        }
        tag = tag.split('-');
        angular.forEach(tag,function(partName,partKey){
            var f = partName.charAt(0).toUpperCase();
            tag[partKey] = f + partName.substr(1, partName.length-1);
        });
        var factory = tag.join('')+'Markup';
        return factory;
    }

}