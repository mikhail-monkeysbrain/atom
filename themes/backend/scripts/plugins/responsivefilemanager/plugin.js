tinymce.PluginManager.add("responsivefilemanager", function (e) {
  function n(t) {
    0 === e.settings.external_filemanager_path.toLowerCase().indexOf(t.origin.toLowerCase()) && "responsivefilemanager" === t.data.sender && (tinymce.activeEditor.insertContent(t.data.html), tinymce.activeEditor.windowManager.close(), window.removeEventListener ? window.removeEventListener("message", n, !1) : window.detachEvent("onmessage", n))
  }

  function t() {
    var t = $(window).innerWidth() - 30, i = $(window).innerHeight() - 60;
    t > 1800 && (t = 1800), i > 1200 && (i = 1200);
    var a = (t - 20) % 138;
    if (t = t - a + 10, t > 600) {
      var a = (t - 20) % 138;
      t = t - a + 10
    }
    e.focus(!0);
    var s = "RESPONSIVE FileManager";
    "undefined" != typeof e.settings.filemanager_title && e.settings.filemanager_title && (s = e.settings.filemanager_title);
    var r = "key";
    "undefined" != typeof e.settings.filemanager_access_key && e.settings.filemanager_access_key && (r = e.settings.filemanager_access_key);
    var o = "";
    "undefined" != typeof e.settings.filemanager_sort_by && e.settings.filemanager_sort_by && (o = "&sort_by=" + e.settings.filemanager_sort_by);
    var g = "false";
    "undefined" != typeof e.settings.filemanager_descending && e.settings.filemanager_descending && (g = e.settings.filemanager_descending);
    var d = "";
    "undefined" != typeof e.settings.filemanager_subfolder && e.settings.filemanager_subfolder && (d = "&fldr=" + e.settings.filemanager_subfolder);
    var l = "";
    "undefined" != typeof e.settings.filemanager_crossdomain && e.settings.filemanager_crossdomain && (l = "&crossdomain=1", window.addEventListener ? window.addEventListener("message", n, !1) : window.attachEvent("onmessage", n)), win = e.windowManager.open({
      title: s,
      file: e.settings.external_filemanager_path + "dialog.php?type=4&descending=" + g + o + d + l + "&lang=" + e.settings.language + "&akey=" + r,
      width: t,
      height: i,
      inline: 1,
      resizable: !0,
      maximizable: !0
    })
  }

  e.addButton("responsivefilemanager", {
    icon: "browse",
    tooltip: "Insert file",
    shortcut: "Ctrl+E",
    onclick: t
  }), e.addShortcut("Ctrl+E", "", t), e.addMenuItem("responsivefilemanager", {
    icon: "browse",
    text: "Insert file",
    shortcut: "Ctrl+E",
    onclick: t,
    context: "insert"
  })
});