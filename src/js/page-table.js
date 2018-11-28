$(document).ready(function() {
  var currentEl;
  var currentElRow;
  var currentUrl;
  var currentNumberWrapper;
  var currentInput;
  var deleteBtnEl = $('[data-target="#modalDelete"]');
  createInputTypeNumber();

  $(".select-with-search").select2();

  $("body.page-table").on(
    "focus",
    ".input-group-search .input-group-search__input-search",
    function() {
      $(this)
        .parent(".input-group-search")
        .addClass("focus");
    }
  );

  $("body.page-table").on(
    "blur",
    ".input-group-search .input-group-search__input-search",
    function() {
      if (!$(this).val()) {
        $(this)
          .parent(".input-group-search")
          .removeClass("focus");
      }
    }
  );

  $(".table-body").on(
    "click",
    'th label[for = "checkbox-select-all"]',
    function() {
      if (
        $(this)
          .siblings("#checkbox-select-all")
          .prop("checked")
      ) {
        $("td .form-check-input").prop("checked", false);
      }
      else {
        $("td .form-check-input").prop("checked", true);
      }
      setTimeout(disabledDeleteBtn, 50);
    }
  );

  function disabledDeleteBtn() {
    if($(" td .form-check-input:checked")[0]) {
      deleteBtnEl.attr("disabled", false);
    }
    else {
      deleteBtnEl.attr("disabled", true);
    }
  }

  $(".table-body").on("click", "td .form-check-input", function() {
    $("th #checkbox-select-all").prop("checked", false);
    disabledDeleteBtn();
  });

  initDatePickers();

  function initDatePickers() {
    $("#datepicker1")
      .datepicker({
        orientation: "bottom",
        language: "ru"
      })
      .on("show", function() {
        currentEl = $(this);
        currentEl.addClass("datepicker-open");
      })
      .on("hide", function() {
        currentEl = $(this);
        currentEl.removeClass("datepicker-open");
      });

    $("#datepicker2")
      .datepicker({
        orientation: "bottom",
        language: "ru"
      })
      .on("show", function() {
        currentEl = $(this);
        currentEl.addClass("datepicker-open");
      })
      .on("hide", function() {
        currentEl = $(this);
        currentEl.removeClass("datepicker-open");
      });
  }

  $("#datepicker")
    .datepicker({
      pickTime: true,
      orientation: "bottom",
      language: "ru",
      format: "yyyy-mm-dd"
    })
    .on("show", function() {
      currentEl = $(this);
      currentEl.addClass("datepicker-open");
    })
    .on("hide", function() {
      currentEl = $(this);
      currentEl.removeClass("datepicker-open");
    });

  $(".table").on("change", "tbody .switch.switch-input", function() {
    currentEl = $(this);
    currentElRow = currentEl.parents(".edit-row");
    currentUrl = currentElRow.data("href");

    $.ajax({
      // type: "POST",
      // url: currentUrl,
      // success: function(data) {
      //   $("#results").html(data);
      // },
      // error: function(xhr, str) {}
    });
  });

  $("tbody").on("click", "td", function() {
    currentEl = $(this);
    if (currentEl.hasClass("not-locate")) {
      return;
    }
    currentElRow = currentEl.parents(".edit-row");
    currentUrl = currentElRow.data("href");
    location.href = currentUrl;
  });

  $("body").on("shown.bs.popover", function() {
    createInputTypeNumber(true);
    createInputTypeCheckbox();
    addEventClosePopover();
    toggleCustomSwitch();
    initDatePickers();
    $('[data-toggle="popover"]').popover("update");
  });

  function toggleCustomSwitch() {
    $(".switch").click(function() {
      currentInput = $(this).children("input");
      if (currentInput.attr("checked")) {
        currentInput.removeAttr("checked");
        return;
      }
      currentInput.attr("checked", "checked");
    });
  }

  function addEventClosePopover() {
    $(".btn-cancel").click(function(e) {
      $(".files-block-item").removeClass("popover-open");
      $('[data-toggle="popover"]').popover("hide");
    });
  }

  function createInputTypeCheckbox() {
    $(".popover-input-type-checkbox").attr("type", "checkbox");
  }

  function createInputTypeNumber(inPopover) {
    if (inPopover) {
      currentNumberWrapper = $(".popover .simple-search-number-wrapper");
    } else {
      currentNumberWrapper = $(".simple-search-number-wrapper");
    }
    $(
      '<div class="simple-search-number-nav"><div class="simple-search-number-button simple-search-number-up"><i class="fa fa-caret-up"></i></div><div class="simple-search-number-button simple-search-number-down"><i class="fa fa-caret-down"></i></div></div>'
    ).insertAfter(".simple-search-number-wrapper input");

    currentNumberWrapper.each(function() {
      var spinner = $(this),
        input = spinner.find(".simple-search-number"),
        btnUp = spinner.find(".simple-search-number-up"),
        btnDown = spinner.find(".simple-search-number-down");

      btnUp.click(function() {
        if (input.attr("disabled")) return;
        var oldValue = parseFloat(input.val());
        if (!input.val()) {
          oldValue = 0;
        }
        var newVal = oldValue + 1;
        input.val(newVal);
        input.trigger("change");
      });

      btnDown.click(function() {
        if (input.attr("disabled")) return;
        var oldValue = parseFloat(input.val());
        if (!input.val()) {
          oldValue = 0;
        }
        var newVal = oldValue - 1;
        input.val(newVal);
        input.trigger("change");
      });
    });
  }
  
  // setTimeout(function() {
  //   // window.resize("1px");
  //   $("table").fixedHeaderTable()
  // }, 500);

  $("table").fixedHeaderTable();

  $(window).resize(function() {
    $("#table-main-page").fixedHeaderTable();
  });


  $('[data-toggle="popover"]').popover({
    html: true,
    offset: "0, 5"
  });
  $('[data-toggle="popover"]').on("click", function() {
    $('[data-toggle="popover"]')
      .not(this)
      .popover("hide");
  });
  $(".fht-tbody").scroll(function() {
    $('[data-toggle="popover"]').popover("update");
  });

  $("body").on("click ", ".btn-filter-page-edit", function() {
    currentEl = $(this);
    if (currentEl.parents(".files-block-item").hasClass("popover-open")) {
      $(".files-block-item").removeClass("popover-open");
      return;
    }
    $(".files-block-item").removeClass("popover-open");
    currentEl.parents(".files-block-item").toggleClass("popover-open");
  });

  $(".files-block").on("click", "label", function(e) {
    currentEl = $(this);
    if (currentEl.parents(".files-block").hasClass("disabled")) {
      e.preventDefault();
    }
  });

  $(".field__link").on("click", function(e) {
    currentEl = $(this);
    console.log("Клик прошел");
    if (
      currentEl
        .siblings(".field-input-group_input-full-width")
        .children(".select2-container")
        .hasClass("select2-container--disabled")
    ) {
      e.preventDefault();
      console.log("Стопнул");
    }
  });

  $(".summernote").summernote({
    lang: "ru-RU",
    height: 150,
    codemirror: {
      mode: "text/html",
      htmlMode: true,
      lineNumbers: true,
      theme: "monokai",
      textWrapping: true,
      height: "150px"
    }
  });

  $(
    '.modal[aria-label = "Вставить ссылку"] .modal-dialog .form-group:nth-of-type(2)'
  ).append(
    '<div data-target="#modal-file-manager" data-toggle="modal" class = "open-file-manager d-flex justify-content-center align-items-center"><i class="fa fa-folder-open" aria-hidden="true"></i></div>'
  );

  $(
    '.modal[aria-label = "Вставить картинку"] .modal-dialog .form-group:nth-of-type(2)'
  ).append(
    '<div data-target="#modal-file-manager" data-toggle="modal" class = "open-file-manager d-flex justify-content-center align-items-center"><i class="fa fa-folder-open" aria-hidden="true"></i></div>'
  );

  $('.modal[aria-label = "Вставить видео"] .modal-dialog .form-group').append(
    '<div data-target="#modal-file-manager" data-toggle="modal" class = "open-file-manager d-flex justify-content-center align-items-center"><i class="fa fa-folder-open" aria-hidden="true"></i></div>'
  );

  $(".files-block-item-handler").on(
    "click",
    ".files-block-item-handler__btn_delete",
    function() {
      $(this)
        .parents(".files-block-item")
        .addClass("active");
    }
  );

  $("#modalDeleteFile").on("hidden.bs.modal", function(e) {
    $(".files-block-item").removeClass("active");
  });
});