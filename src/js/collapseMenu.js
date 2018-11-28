let $body = $('body')
let $burger = $('.header--burger')
let $menu = $('.menu')
let $main = $('.main')
let $menuItem = $('.menu--item')
let $menuCollapse = $('.menu--collapse--item')
let $currentPage = $('.menu').attr('data-current')
// Ключ открытого меню
let menuIsOpen = localStorage.getItem('menuOpen')
// Брейкпоинт таблет или меньше
const mobileBreak = $(window).width() < 991




function _menuHeight () {
  let $mainHeight = $main.height() + 205
  console.log($mainHeight)
  $menu.css('min-height', $mainHeight)
  

  $('body').on('change', 'input', function () {
    let $mainHeightChange = $main.height() + 20
    $menu.css('min-height', $mainHeightChange)
  })
  
  $('body').on('click', function () {
    let $mainHeightChange = $main.height() + 20
    $menu.css('min-height', $mainHeightChange)
  })

  setTimeout(function () {
    $('body').trigger('click')
  }, 100)
}

// Если в таблете или меньше
// при загрузке страницы меню скрыто
// у body нет скролла
function _openMenu () {
  if (mobileBreak) {
    localStorage.setItem('menuOpen', 'false')
    $burger.click( function () {
      $body.toggleClass('no-scroll open-menu')
    })
  } else {
    $burger.click( function () {
      $body.toggleClass('open-menu')
      if (menuIsOpen === 'true') {
          localStorage.setItem('menuOpen', 'false')
      } else {
        localStorage.setItem('menuOpen', 'true')
      }
    })
  }
}

// Проверяем, было ли открыто меню
// до обновления страницы
function _isOpenMenu () {
  if (menuIsOpen === 'true') {
    $body.addClass('open-menu')
  } else {
    $body.removeClass('open-menu')
  }
}

function _menuSwitch () {
  $menuItem.click((e) => {
    let $this = $(e.currentTarget)
    let $other = $('.menu--collapse')
    let $otherCollapse = $('.menu--item')
    let $collapse = $this.find('.menu--collapse')
    // если еще не было открыто - открываем
    if (!$this.hasClass('menu--item__expand')){
      $other.slideUp()
      $otherCollapse.removeClass('menu--item__expand')
      $collapse.slideDown()
      $this.addClass('menu--item__expand')
    // если уже было открыто - закрываем
    } else {
      $other.slideUp()
      $otherCollapse.removeClass('menu--item__expand')
    }
  })
}

function _currentPage () {
  $menuCollapse.each(function () {
    let $this = $(this)
    let $parent = $this.parent('.menu--collapse')
    let $thisDataItem = $this.attr('data-page')
    // ищем совпадение ссылки и текущей страницы
    // при совпадении - раскрываем меню
    if ($thisDataItem === $currentPage) {
      $this.addClass('menu--collapse--item__current')
      $parent.slideDown().parent('.menu--item').addClass('menu--item__expand')
    }
  })
}


// откладываем загрузку
$(document).ready(
  _isOpenMenu(),
  _currentPage(),
  _menuSwitch(),
  _openMenu()
)
