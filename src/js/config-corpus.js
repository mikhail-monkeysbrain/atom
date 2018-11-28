$(document).ready(function() {
  const inputItem = $(".js-item-value");
  var currentItem = $("body");
  var popperBody = $(".popover-config-corpus");
  
  var configPopper = {
    modifiers: {
      preventOverflow: { enabled: true }
    },
    placement: "right",
    eventsEnabled: true,
    removeOnDestroy: true,
    onCreate() {
      inputItem.val("");
      popperShow();
      currentItem.addClass("active");
    },
    onUpdate() {}
  };
  var popper = new Popper(currentItem, popperBody, {});

  $(".corpus-config-selector").on(
    "click",
    ".corpus-config-selector__item",
    mainFunctionPopover
  );

  $(".popover-config-corpus").on("input change", ".js-item-value", validation);

  $(".popover-config-corpus").on("click", ".btn-cancel", popperClose);

  popperBody.on("click", ".mode-delete__btn", function() {
    resetValueItem(currentItem);
    popperClose();
  });
  popperBody.on("click", ".btn-ok", function() {
    setItemValue(currentItem);
    popperClose();
  });

  function mainFunctionPopover() {
    currentItem = $(this);
    changePopoverMode(currentItem);
    var myPopper = new Popper(currentItem, popperBody, configPopper);
    setTimeout(function() {
      myPopper.update();
    }, 20);
  }

  function changePopoverMode(currentItem) {
    if (checkHasClass(currentItem)) {
      toogleResetMode(currentItem);
    } else {
      toogleWriteMode(currentItem);
    }
  }

  function validation() {
    inputItem.val(inputItem.val().slice(-2));
  }

  function popperShow() {
    $(".popover-config-corpus").removeClass("d-none");
    $(".corpus-config-selector__item").removeClass("active");
  }

  function popperClose() {
    $(".popover-config-corpus").addClass("d-none");
    $(".corpus-config-selector__item").removeClass("active");
  }

  function checkHasNumber(currentItem) {
    return currentItem.text().length > 0;
  }

  function checkHasClass(currentItem) {
    return currentItem.hasClass("selected");
  }

  function toogleWriteMode(currentItem) {
    $(".mode-delete").removeClass("d-inline-block");
    $(".mode-write").addClass("d-inline-block");
  }

  function toogleResetMode(currentItem) {
    $(".mode-delete").addClass("d-inline-block");
    $(".mode-write").removeClass("d-inline-block");
  }

  function resetValueItem(currentItem) {
    currentItem.removeClass("selected").find("input").val("");
  }
  function setItemValue(currentItem) {
    var val = inputItem.val();
    if (val == "") return;
    currentItem.addClass("selected").find("input").val(val);
  }
});
