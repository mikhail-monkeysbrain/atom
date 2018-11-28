// different small scripts
let $tooltype = $('[data-toggle="tooltip"]')

function _tooltype () {
  $tooltype.tooltip()
}

// откладываем загрузку
$(document).ready(
  _tooltype()
)
