$(document).ready(function() {
  $("#js-el-on-page")
    .select2({
      minimumResultsForSearch: Infinity
    })
    .on("select2:select", function() {
      var currentUrl = $(this).find(':selected').data("href");
      location.href = currentUrl;
    });
  $("#simple-select").select2({
    placeholder: "Выбрать"
  });

  $(document).on("change", "#js-el-on-page", function() {
    $("#js-el-on-page-display").text(
      $("#js-el-on-page option:selected").text()
    );
  });

  $("body").on("shown.bs.popover", createMultiSelect);

  createMultiSelect();

  function createMultiSelect() {
    $(".select-work-status")
      .select2({
        placeholder: "Выбрать"
      })
      .on("select2:select select2:unselect", function() {
        $('[data-toggle="popover"]').popover("update");
      })
      .on("select2:opening select2:closing", function(event) {
        $(this)
          .parent()
          .find(".select2-search__field")
          .prop("disabled", true);
      });
  }
});
