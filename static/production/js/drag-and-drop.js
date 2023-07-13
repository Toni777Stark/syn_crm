$(function() {
  const socket = new WebSocket('ws://' + window.location.host + '/ws/some_path/');

  socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      console.log(data)
      console.log("type_upd: ", data.type_upd);
      console.log("reg_id: ", data.reg_id);
      console.log("direction_mane: ", data.direction_mane);
      console.log("action: ", data.action);
      
      $(`.manager[data-id='${data.reg_id}']`).clone().addClass("clone").appendTo(`.region[data-id='${data.direction_mane}'] .manager-block`);
      $(`.region[data-id!='${data.direction_mane}'] .manager[data-id='${data.reg_id}'][class!='clone']`).remove();
      sort_drag_exchange_item()
      }
});


function move_exchange_close() {
  $("#move-exchange").removeClass('active')
  $("body").removeClass('none-scroll')
}
function move_exchange_open() {
  $("#move-exchange").addClass('active')
  $("body").addClass('none-scroll')
}

function sort_drag_exchange_item() {
  $ ( ".region-block .exchange-group").sortable();
  $ ( ".region-block .exchange-group-item").draggable ({
    connectToSortable: ".region-block .exchange-group",
    containment: ".region-block",
    revert: "invalid",
    revertDuration: 1,
    stop: function() {
      var region_id = $(this).parent().parent().parent().parent().attr("data-id")
      var manager_id = $(this).parent().parent().attr("data-id")
      var exchange_position = $(this).index()
      var exchange_id = $(this).attr("data-id")

      console.log(`Заказ №${exchange_id} перенесен в регион ${region_id}, менеджер ${manager_id}, позиция ${exchange_position}`)
    },
  });

  $(".region-block .manager-block").sortable();
  $(".region-block .manager").draggable({
    connectToSortable: ".manager-block",
    containment: ".region-block",
    revert: "invalid",
    revertDuration: 1,
    start: function() {
      $(this).addClass("active")
    },
    stop: function() {
      $(this).removeClass("active")
      var region_id = $(this).parent().parent().attr("data-id")
      var manager_id = $(this).attr("data-id")

      console.log(`Менеджер №${manager_id} перенесен в регион ${region_id}`)
    }
  });

    $(".orders-list .exchange-group").sortable({});
    $(".orders-list .exchange-group-item").draggable({
      //'${$(this).parent().parent().attr("data-id")}'
      connectToSortable: ".region-block .exchange-group",
      zIndex: 1,
      revert: "invalid",
      revertDuration: 1,
      helper: "clone",
      stop: function() {
        var region_id = $(this).parent().parent().parent().parent().attr("data-id")
        var manager_id = $(this).parent().parent().attr("data-id")
        var exchange_position = $(this).index()
        var exchange_id = $(this).attr("data-id")

        let exchange_quantity = $(this).find(".quantity span").text()
        let exchange_slider_value = $("#formPopup #slider").val()
        let exchange_full = exchange_quantity - exchange_slider_value

        $(this).find(".quantity span").text(exchange_full)
        
        console.log(exchange_quantity - exchange_slider_value)
        console.log(`Заказ №${exchange_id} перенесен в регион ${region_id}, менеджер ${manager_id}, позиция ${exchange_position}`)
      },
    })
}



sort_drag_exchange_item()