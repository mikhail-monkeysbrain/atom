$(document).ready(function() {
  var submit      = $('[type="submit"]');
  var summerCard  = $('.note-frame.card');
  var triggerCard =  $('.btn-codeview')


  submit.on('click', function () {
    console.log('triggerCard')
    if(summerCard.hasClass('codeview')) {
      triggerCard.click();
    }
  });
});