$(".zoom-level input").on('input', function () {
	if ($(this).val().length > 2) {
		$(this).val("100")
	}
});
$(".zoom-level input").on('change', function () {
	zoom($(this).val() + "%")
	$(this).val("")
});


function zoom(input_value) {
	$("html").css({
		"zoom": input_value
	})
}


$(window).keyup(function(e){
	var target = $('.checkbox-label input:focus');
	if (e.keyCode == 9 && $(target).length){
		$(target).parent().addClass('focused');
	}
});
 
$('.checkbox-label input').focusout(function(){
	$(this).parent().removeClass('focused');
});

function view_manager_open() {
    $("#view-manager").addClass('active')
    $("body").addClass('none-scroll')
}
function view_manager_close() {
    $("#view-manager").removeClass('active')
    $("body").removeClass('none-scroll')
}

function move_manager_open() {
    $("#move-manager").addClass('active')
    $("body").addClass('none-scroll')
}
function move_manager_close() {
    $("#move-manager").removeClass('active')
    $("body").removeClass('none-scroll')
}

function remove_manager_open() {
    $("#remove-manager").addClass('active')
    $("body").addClass('none-scroll')
}
function remove_manager_close() {
    $("#remove-manager").removeClass('active')
    $("body").removeClass('none-scroll')
}

$(function() {
	$.contextMenu({
		selector: '.manager-name',
		items: {
			view: {
				name: "Посмотреть",
				callback: function(key){
					view_manager_open()
				}
			},
			move: {
				name: "Переместить",
				callback: function(key){
					move_manager_open()
				}
			},
			remove: {
				name: "Удалить",
				callback: function(key){
					remove_manager_open()
				}
			}
		}
	});
})


function open_notification() {
	$(".notifications-container").addClass("active")
}
function close_notification() {
	$(".notifications-container").removeClass("active")
}

$(".notificate-close").on('click', function () {
	$(this).parent().remove()
})