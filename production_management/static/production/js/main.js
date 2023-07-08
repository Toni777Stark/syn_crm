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
	$("#content-block").css({
		"zoom": input_value
	})
}
// Zoom
zoom("100%")

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

function openForm(event, quantity) {
  event.preventDefault(); // Отменить стандартное контекстное меню

  if (event.which === 3 || event.button === 2) {
    // Проверить, что была нажата правая кнопка мыши
    const formPopup = document.getElementById('formPopup');
    const slider = formPopup.querySelector('#slider');
    const sliderValue = formPopup.querySelector('#sliderValue');
    // Позиционирование всплывающего окна ниже и правее от клика мыши
    slider.value = quantity;
    slider.max = quantity;
    sliderValue.textContent = quantity;
    const clickX = event.pageX;
    const clickY = event.pageY;
    const popupWidth = formPopup.offsetWidth;
    const popupHeight = formPopup.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const left = Math.min(clickX, windowWidth - popupWidth);
    const top = Math.min(clickY, windowHeight - popupHeight);

    formPopup.style.left = `${left}px`;
    formPopup.style.top = `${top}px`;
    formPopup.style.display = 'block';

    // Предотвращение закрытия блока при клике внутри него
    formPopup.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }
}

document.addEventListener('click', function(event) {
  const formPopup = document.getElementById('formPopup');
  formPopup.style.display = 'none';
});




//$(function() {
//	$.contextMenu({
//		selector: '.manager-name, .exchange-group-item',
//		items: {
//			view: {
//				name: "Посмотреть",
//				callback: function(key){
//					view_manager_open()
//					console.log(key)
//				}
//			},
//			move: {
//				name: "Переместить",
//				callback: function(key){
//					move_manager_open()
//					console.log(key)
//				}
//			},
//			remove: {
//				name: "Удалить",
//				callback: function(key){
//					remove_manager_open()
//					console.log(key)
//				}
//			}
//		}
//	});
//})


function open_notification() {
	$(".notifications-container").addClass("active")
}
function close_notification() {
	$(".notifications-container").removeClass("active")
}

$(".notificate-close").on('click', function () {
	$(this).parent().remove()
})