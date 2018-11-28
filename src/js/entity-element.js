let $changeAction = $('[data-action]')
let $deleteItemButton = $('.js-trigger')

function _deleteItem () {
  $changeAction.click(function (e) {
    let $this = $(e.currentTarget)
    let action = $this.attr('data-action')
    let formTarget = $('form')
    formTarget.attr('action', action).submit()
  })

  $deleteItemButton.click(function (e) {
    let $this = $(e.currentTarget)
    let $target = $('.' + $this.attr('data-trigger') + '')
    $target.trigger('click')
  })
}

// откладываем загрузку
$(document).ready(
  _deleteItem()
)
