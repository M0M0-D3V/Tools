$(function () {
  $("#image-list").sortable({
    update: function (event, ui) {
      getAllImageIds();
      console.log(`event ${event} - ui ${ui}`);
    },
  });
});

function getAllImageIds() {
  var values = [];
  $(".list-item").each(function (index) {
    console.log(index);
    values.push($(this).attr("id").replace("image-", ""));
    $("#output").attr();
  });
}
