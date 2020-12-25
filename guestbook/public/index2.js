function showEntries(entries){
    var $list = $("#booklist");
    $list.empty();
    entries.forEach((entry)=>{
          var $panel = $("<div>").addClass("panel")
                                 .addClass("panel-default");
           $list.append($panel);
    })
  }

function reload() {
    $.ajax({
        type: 'GET',
        url: '/api/guestbook',
        error: function () {},
        success: function (data) {
            if (data.success) console.log(data.entries);
        }
    });
}

$(function () {
    var $list = $("#booklist");
    reload();
});