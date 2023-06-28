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



