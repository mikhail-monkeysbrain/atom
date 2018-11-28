$(document).ready(function() {
  
  $(window).resize(function() {
    if ($("a.sidebar-toogler").hasClass("collapsed")) {
      $(".with-sidebar").removeClass("js-padding-left");
      return;
    }
  });
  if ($(".with-sidebar")) {
    initNavbarSlider();
    function initNavbarSlider() {
      if (document.documentElement.clientWidth <= 1024) {
        $("a.sidebar-toogler").addClass("collapsed");
        $("div.accordion-side-bar").removeClass("show");
        $("a.sidebar-toogler").attr("aria-expanded", false);
        $(".with-sidebar").removeClass("js-padding-left");
      } else if (document.documentElement.clientWidth > 1024) {
        $("a.sidebar-toogler").removeClass("collapsed");
        $("div.accordion-side-bar").addClass("show");
        $("a.sidebar-toogler").attr("aria-expanded", true);
        $(".with-sidebar").addClass("js-padding-left");
      }
    }
    $(window).resize(function() {
      initNavbarSlider();
    });

    $("a.sidebar-toogler").on("click", function() {
      closePopover();
      if (document.documentElement.clientWidth > 750) {
        if ($("div.accordion-side-bar").hasClass("show")) {
          $(".with-sidebar").removeClass("js-padding-left");
        } else {
          $(".with-sidebar").addClass("js-padding-left");
        }
      }
      setTimeout(function() {
        $("#table-main-page").fixedHeaderTable();
      }, 500)
    });
    function closePopover() {
      $(".corpus-config-selector__item").removeClass("active");
      $(".popover-config-corpus").addClass("d-none");
      $(".files-block-item").removeClass("popover-open");
      $('[data-toggle="popover"]').popover("hide");
    }
  }
  openTabMenu();
  function openTabMenu() {
    $(".sub-menu-link.active").closest("[data-parent = '#accordion']").siblings(".card-header").find("[data-toggle = 'collapse']").attr("aria-expanded", true);
    $(".sub-menu-link.active").closest("[data-parent = '#accordion']").addClass("show");
    console.log($(".sub-menu-link.active").closest("[aria-target]"));
  }
});
