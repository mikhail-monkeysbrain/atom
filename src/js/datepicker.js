let $datePicker = $('.date:not([readonly]')
let $dateMultiPicker = $('.date__multi:not([readonly]')

function _datePicker () {

  $datePicker.daterangepicker({
    timePicker: true,
    timePicker24Hour: true,
    singleDatePicker: true,
    locale: {
      format: 'DD.MM.YYYY HH:mm',
      applyLabel: 'Принять',
      cancelLabel: 'Отмена',
      invalidDateLabel: 'Выберите дату',
      daysOfWeek: ['Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс', 'Пн'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      firstDay: 1
  }
  })
  .next().click(function (e) {
    let $this = $(e.currentTarget)
    let $date = $this.parent('.input-group__date').find('.date')
    $date.focus()
  })

  $dateMultiPicker.daterangepicker({
    locale: {
      format: 'DD.MM.YYYY',
      applyLabel: 'Принять',
      cancelLabel: 'Отмена',
      invalidDateLabel: 'Выберите дату',
      daysOfWeek: ['Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс', 'Пн'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      firstDay: 1
  }
  }).next()
  .click(function (e) {
    let $this = $(e.currentTarget)
    let $date = $this.parent('.input-group__date').find('.date__multi')
    $date.focus()
  })

  $('.input-group__date').on('click', '.date', function () {
    $('.hourselect option:lt(10)').each(function (e) {
      for(let i = 0; i < 10; ++i) {
        $(this).html('0' + e).val('0' + e)
      }
    })
  })
}

// откладываем загрузку
$(document).ready(
  _datePicker()
)
