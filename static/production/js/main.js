$(".zoom-level input").on('input', function () {
	if ($(this).val().length > 2) {
    $(this).attr("placeholder", "100%")
		$(this).val("100")
	}
});
$(".zoom-level input").on('change', function () {
  var value_input_zoom = $(this).val() + "%"
	$(this).attr("placeholder", value_input_zoom)
	zoom(value_input_zoom)
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

function remove_manager_open() {
    $("#remove-manager").addClass('active')
    $("body").addClass('none-scroll')
}
function remove_manager_close() {
    $("#remove-manager").removeClass('active')
    $("body").removeClass('none-scroll')
}

if($(window).width() < 531) {
  $("#not-mobile-window").addClass("active")
  $("body").addClass('none-scroll')
} else {
  $("#not-mobile-window").removeClass("active")
  $("body").removeClass('none-scroll')
}







function openForm(event, quantity) {
  $("#formPopup #slider").attr("max", quantity)
  event.preventDefault(); // Отменить стандартное контекстное меню

  if (event.which === 3 || event.button === 2) {
    // Проверить, что была нажата правая кнопка мыши
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
  $("#slider").val(1)
  $("#sliderValue").text("1")
  const formPopup = document.getElementById('formPopup');
  formPopup.style.display = 'none';
});

$("#slider").on("input", function() {
  $("#formPopup #sliderValue").text($("#formPopup #slider").val())
})
