/*let $fileInput = $('.file-triggered')


function _addFile () {
  // делегируем ссылку в родителя для возможности работать с виртуальным DOM
  $('.js-img-upload').on('click', '.file-triggered', function() {

    let $parent = $(this).closest('fieldset')
    let $fieldsetWrapper = $(this).closest('.js-img-upload')
    let $fieldset = $(this).closest('fieldset')
    let $input = $parent.find('input')
    let $img = $parent.find('img')
    let $editor = $fieldsetWrapper.find('.add-file--img--edit')
    // счетчик итератора загруженных файлов
    let counter = 0

    // при клике копируем ссылку
    $(this)
      .parent()
      .clone()
      .appendTo($(this).closest('.js-img-upload'))

    // удаляем ссылку, даже если не загрузили - уже отрендерен ее клон
    $(this).remove()

    // триггерим скрытый input file
    $input.trigger('click')

    // получаем свойства загруженных файлов
    function readURL(input) {
      for (let value of input.files) {
        let maxFiles = 10
          if (counter < maxFiles) {
          let reader = new FileReader()
          reader.onload = function (e) {
            let base64Img = e.target.result
            $parent.append('<div class="add-file--img--block"><img class="add-file--img" src="' + base64Img +'" alt="" /> <span class="add-file--img__name">' + value.name + '</span></div>')
            $parent.find('.base64').val(base64Img)
            // копируем блок редактирования для каждого блока с изображением
            $editor.clone().appendTo('.add-file--img--block')
          }
          reader.readAsDataURL(input.files[counter])
        }
        counter++
      }
    }
    $input.change(function(){
      readURL(this)
    })
  })
  
  // удаление 1 блока изображения
  $('.js-img-upload, .js-file-upload').on('click', '.add-file--img--edit__del', function () {
    let $this = $(this)
    let $target = $this.closest('.add-file--img--block')
    $target.remove()
  })

  // редактирование блока изображения
  $('.js-img-upload, .js-file-upload').on('click', '.add-file--img--edit__name', function () {
    let $this = $(this)
    $('.add-file--img--block').removeClass('js-edit')
    let $target = $this.closest('.add-file--img--block').addClass('js-edit')
  })

  // редактирование имени изображения
  $('.js-img-upload, .js-file-upload').on('click', '.js-img-name', function () {
    let $this = $(this)
    let $input = $this.prev()
    let nameVal = $this.prev().val()
    let $name = $this.closest('.add-file--img--block').find('.add-file--img__name')
    if(nameVal.length !== 0) {
      $input.removeClass('is-invalid')
      $name.html(nameVal)
      $this.prev().val('')
      $('.add-file--img--block').removeClass('js-edit')
    } else {
      $input.addClass('is-invalid')
    }
  })

  // отмена редактирования имени изображения
  $('.js-img-upload, .js-file-upload').on('click', '.js-closeDialog', function () {
    let $this = $(this)
    let $input = $this.closest('.add-file--img--block').find('.edit--dialog__name')
    let $parent = $this.closest('.add-file--img--block')
    $parent.removeClass('js-edit')
    $input.removeClass('is-invalid')
  })

  $('.js-file-upload').on('click', '.file-triggered', function() {
    let $parent = $(this).closest('fieldset')
    let $fieldsetWrapper = $(this).closest('.js-file-upload')
    let $fieldset = $(this).closest('fieldset')
    let $input = $parent.find('input')
    let $img = $parent.find('img')
    let $editor = $fieldsetWrapper.find('.add-file--img--edit')
    // счетчик итератора загруженных файлов
    let counter = 0
    let multy = $input.attr('multiple')

    if(multy === 'multiple'){
      $(this)
      .parent()
      .clone()
      .appendTo($(this).closest('.js-file-upload'))
    }

    // удаляем ссылку, даже если не загрузили - уже отрендерен ее клон
    $(this).remove()

    // триггерим скрытый input file
    $input.trigger('click').change(function () {
      for(let i = 0; i < $(this).get(0).files.length; ++i) {
        let name = $(this).get(0).files[i].name
        $parent.append('<div class="add-file--img--block"><img class="add-file--img" src="./img/addfile.jpg" alt="" /> <span class="add-file--img__name">' + name + '</span></div>')
        $editor.clone().appendTo('.add-file--img--block')
      }
    })

  })

  $('body').keyup(function(event){
    if(event.keyCode == 13){
      $('.js-edit').find('.js-img-name').click()
    }
  })
}

// откладываем загрузку
$(document).ready(
  _addFile()
)
*/
