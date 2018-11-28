$(document).ready(function() {
  $("body.page-login").on("focus", ".form-group .form-control", function() {
    $(this)
      .parent(".form-group")
      .addClass("active-form-group");
  });
  $("body.page-login").on("blur", ".form-group .form-control", function() {
    if ($(this).val()) {
      $(this)
        .parent(".form-group")
        .addClass("active-form-group");
    } else {
      $(this)
        .parent(".form-group")
        .removeClass("active-form-group");
    }
  });
  $("body.page-login").on("click", ".form-group .form-check-label", function() {
    if (!$("#remember-me").prop("checked")) {
      $(this)
        .parent(".form-group")
        .addClass("active-form-group");
    } else {
      $(this)
        .parent(".form-group")
        .removeClass("active-form-group");
    }
  });

  $("body.page-login").on("blur", ".form-group #email", function() {
    let email = $(this).val();

    if (email.length > 0 && (email.match(/.+?\@.+/g) || []).length !== 1) {
      $(this)
        .siblings(".error-message")
        .text("Такого e-mail не существует");
      $(this)
        .parent(".form-group")
        .addClass("wrong-form-group");
    } else {
      $(this)
        .siblings(".error-message")
        .text("");
      $(this)
        .parent(".form-group")
        .removeClass("wrong-form-group");
    }
  });
});
