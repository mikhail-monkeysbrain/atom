let $selectAllInTable = $('.table__check input')
let $selectRowInTable = $('.table-responsive tbody tr th input')
let $cellLink = $('td')
let $tableOpenFilter = $('.table--open-filter .fa-filter')
let $tableCloseFilter = $('.table--open-filter .js-closeDialog')
let $tableSort = $('.table--sort__up, .table--sort__down')
let $body = $('body')
let $html = $('html')
let $currentPage = $('.paggination--item__current')

function _fancybox () {
  $('.fancy-gallery').fancybox({
    hash: null
  });
}

function totalEl () {
  $('.total__el').find('select').on('change', function () {
    var $total = $(this).val()
    window.location = $total
  })
}

function _dataToggler () {
  $('.toggler').click(function() {
    var $url = $(this).attr('data-toggleUrl')
    $.ajax({
      type: "post",
      url: $url,
      success: function (response) {
      },
    })
  })
}

function _tableSort () {
  $tableSort.click(function (e) {
    let $this = $(e.currentTarget)
    $tableSort.removeClass('table--sort__active')
    $this.addClass('table--sort__active')
  })
}

function _selectAllInTable () {
  $selectAllInTable.on('change', function (e) {
    let $this = $(e.currentTarget)
    let isChecked = $this.prop('checked')
    if (isChecked) {
      $selectRowInTable.prop('checked', true)
    } else {
      $selectRowInTable.prop('checked', false)
    }
  })
}

function _linkInTable () {

  $cellLink.click(function (e) {
    let $this = $(e.currentTarget)
    let $height = $this.height()
    let href = $this.parent('tr').attr('data-href')
    $this.find('a').attr('href', href)
  })
  $cellLink.find('.toggler').each(function () {
    let $this = $(this)
    let $parent = $this.closest('td')
    let $label = $parent.find('label')
    $this.appendTo($parent)
    $label.appendTo($parent)
  })
}

function _openFilter () {
  $tableOpenFilter.click(function (e) {
    let $this = $(e.currentTarget)
    let $filter = $this.next()
    let $parent = $this.parent()
    $('.table--open-filter').removeClass('filter__current')
    $parent.addClass('filter__current')
    $('.edit--dialog').fadeOut()
    $filter.fadeIn()
  })
  $tableCloseFilter.click(function (e) {
    let $parent = $('.table--open-filter')
    let $dialog = $('.edit--dialog')
    $parent.removeClass('filter__current')
    $dialog.fadeOut()
  })
}

function _noOverflow () {
  if($('.table-form').length !== 0) {
    $('body').addClass('no-overflow')
    $html.addClass('no-overflow')
  }
}

function _calcPage () {
  let $overflow = $currentPage.closest('.overflow__custom')
  //41px - ширина ячейки
  let $itemWidth = 41
  let $overflowWidth = $overflow.width() / 2
  let $offsetLeft = $currentPage.text() * $itemWidth - $overflowWidth
  $overflow.scrollLeft($offsetLeft)
}

function _offsetPage () {
  _calcPage(),
  $(window).resize(function () {
    _calcPage()
  })
}


// откладываем загрузку
$(document).ready(
  _selectAllInTable(),
  _linkInTable(),
  _openFilter(),
  _fancybox(),
  _tableSort(),
  _noOverflow(),
  _offsetPage(),
  _dataToggler(),
  totalEl()
)
