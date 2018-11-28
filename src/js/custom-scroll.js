let $customScroll = $('.overflow__custom')

function _customScroll () {
  let touchSize = 992
  let windowWidth = $(window).width()
  let api = $customScroll.data('jsp')
  if (windowWidth < touchSize) {
    api.destroy()
  } else {
    $customScroll.jScrollPane({
      autoReinitialise: true
    })
  }
}

// откладываем загрузку
$(document).ready(
  // _customScroll()
)
