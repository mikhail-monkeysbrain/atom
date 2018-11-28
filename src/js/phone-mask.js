let $phone = $('.phone')
let $toggleLocation = $('.change-phone--toggler')
let $phoneInput = $('.input-group--change-phone')

function _mask () {
  // Маска телефона в зависимости от языка
  if ($('html').is(':lang(ru)')) {
    $phone.mask('+7 (000) 000 00-00')
  } else {
    $phone.mask('+1 (000) 000 00-00')
  }
}

// Смена региона в телефоне (пока отключил)
function _locationToggle () {
  $toggleLocation.click(function (e) {
    let $this = $(e.currentTarget)
    let $changer = $this.next()
    $changer.slideToggle()
    $changer.find('li').click(function () {
      let $imgLocation = $(this).html()
      let currentLocation = $(this).attr('data-location')
      $this.html($imgLocation)
      $phoneInput.attr('data-code', currentLocation)
      $changer.slideUp()
    })
  })
}


// откладываем загрузку
$(document).ready(
  _mask(),
)
