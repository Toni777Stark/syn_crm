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
    
    if (region_id == undefined || manager_id == undefined || exchange_id == undefined) {
      console.log("Упсс, не туда")
    } else {
      // region id
      console.log("Регион айди - ", region_id)
      // manager id
      console.log("Менеджер айди - ", manager_id)
      // exchange pos
      console.log("Позиция заказа по вертикали - ",exchange_position)
      console.log("Позиция заказа по горизонтали - ",exchange_id)
      alert(`Заказ №${exchange_id} перенесен в регион ${region_id}, менеджер ${manager_id}, позиция ${exchange_position}`)
    }
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
    // region id
    console.log(region_id)
    // manager id
    console.log(manager_id)
    alert(`Менеджер №${manager_id} перенесен в регион ${region_id}`)
  }
});

$(".orders-list .exchange-group").sortable();
$(".orders-list .exchange-group-item").draggable({
  connectToSortable: ".region-block .exchange-group",
  zIndex: 99999,
  revert: "invalid",
  revertDuration: 1,
  stop: function() {
    var region_id = $(this).parent().parent().parent().parent().attr("data-id")
    var manager_id = $(this).parent().parent().attr("data-id")
    var exchange_position = $(this).index()
    var exchange_id = $(this).attr("data-id")
    
    if (region_id == undefined || manager_id == undefined || exchange_id == undefined) {
      console.log("Упсс, ошибочка")
    } else {
      // region id
      console.log(region_id)
      // manager id
      console.log(manager_id)
      // exchange pos
      console.log(exchange_position)
      console.log(exchange_id)
      alert(`Заказ №${exchange_id} перенесен в регион ${region_id}, менеджер ${manager_id}, позиция ${exchange_position}`)
    }
  }
});