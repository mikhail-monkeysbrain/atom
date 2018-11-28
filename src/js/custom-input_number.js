let $inputNumber = $('input[type="number"]')

function _customInputNumber () {
  $inputNumber.before('<i class="fa fa-caret-up js-plus" aria-hidden="true"></i>')
  $inputNumber.after('<i class="fa fa-caret-down js-minus" aria-hidden="true"></i>')
  $(".js-minus").click(function (e) {
    let $this = $(e.currentTarget)
    let $target = $this.parent().find('input')
    if ($target.val() > 1) {
      $target.val(+$target.val() - 1)
    }
  })
  $(".js-plus").click(function (e) {
    let $this = $(e.currentTarget)
    let $target = $this.parent().find('input')
    $target.val(+$target.val() + 1)
  })
}

// откладываем загрузку
$(document).ready(
  _customInputNumber()
)
