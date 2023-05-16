$(function () {
  $("#image-list").sortable({
    update: function (event, ui) {
      getAllImageIds();
    },
  });
});

function getAllImageIds() {
  var values = [];
  $(".list-item").each(function (index) {
    values.push($(this).attr("id").replace("image-", ""));
  });
}
