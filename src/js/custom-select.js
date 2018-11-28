let $selectSingle = $('.select__single')
let $counter = $('.select__single__no-search')
let $totalNumber = $('.total-number-current')
let $elPerPage = $('.select__single__elPerPage')
function _selectInit () {
  if ($selectSingle.hasClass("select2-hidden-accessible")) {

    let $tag = $('.select2-selection__choice')
  
    $tag.each(function () {
      let link = $(this).attr('title')
      $(this)
        .find('span')
        .after('<a class="tag--link" href="' + link + '" target="_blank"><i class="fa fa-link" aria-hidden="true"></i></a>')
    })
    $('li').attr('title', '')
  }
}

function _selectSingle () {
  $selectSingle.select2()
    .on('select2:select', function (e) {
      if ($selectSingle.hasClass("select2-hidden-accessible")) {
        let $this = $(this)
        let $tag = $this.parent().find('.select2-selection__choice')
      
        $tag.each(function () {
          let link = $(this).attr('title')
          $(this)
            .find('span')
            .after('<a class="tag--link" href="' + link + '" target="_blank"><i class="fa fa-link" aria-hidden="true"></i></a>')
        })
        $('li').attr('title', '')
      }
    })
    .on('select2:unselect', function (e) {
      if ($selectSingle.hasClass("select2-hidden-accessible")) {

        let $this = $(this)
        let $tag = $this.parent().find('.select2-selection__choice')
      
        $tag.each(function () {
          let link = $(this).attr('title')
          $(this)
            .find('span')
            .after('<a class="tag--link" href="' + link + '" target="_blank"><i class="fa fa-link" aria-hidden="true"></i></a>')
        })
        $('li').attr('title', '')
      }
    })
  
  $counter.select2({minimumResultsForSearch: Infinity})
  .on('select2:select', function (e) {
    let count = e.params.data.text
    $totalNumber.html(count)
  })

  $elPerPage.select2({minimumResultsForSearch: Infinity})
  .on('select2:select', function (e) {
    let $this = $(e.currentTarget)
    let $value = $this.val()
    let $form = $this.closest('form')
    window.location = $value
  })
}


$(document).ready(
  _selectSingle(),
  _selectInit()
)
