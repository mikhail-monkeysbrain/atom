let $editName = $('.add-file--img--edit__name i')
let $closeDialog = $('.js-closeDialog')

function _inputName () {

  $editName.click(function () {
    let $this = $(this)
    let $parent = $this.parent('.add-file')
    let $dialog = $parent.find('.add-file--img--edit--dialog')
    $dialog.fadeIn()
  })

  $closeDialog.click(function () {
    $dialog.fadeOut()
  })
  
}


// откладываем загрузку
$(document).ready(
  _inputName()
)
