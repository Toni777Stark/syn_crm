$(".comment input").attr("id", "")
$(".tovar-geo select").attr({
    'multiple': '',
    'data-maximum-selection-length': '2'
})
//$(".birzha-name select option:first-child").attr("value", "none")

$('.form-table div').click(function() {
	$("#left-bar").addClass("active")
});
$('.left-bar-close-btn').click(function() {
	$("#left-bar").removeClass("active")
});

$('.pop-window').click(function(e) {
	if (e.target !== this) {
		return;
	}
	addclient_close()
	addbirzh_close()
	editclient_close()
});

function addclient_show() {
    $("#pop-add-birzh").removeClass('active')
    $("#pop-add-client").addClass('active')
    $("body").addClass('none-scroll')
}
function addclient_close() {
    $("#pop-add-client").removeClass('active')
    $("body").removeClass('none-scroll')
}

function editclient_show() {
    $("#pop-add-birzh, #pop-add-client").removeClass('active')
    $("#pop-edit-client").addClass('active')
    $("body").addClass('none-scroll')
}
function editclient_close() {
    $("#pop-edit-client").removeClass('active')
    $("body").removeClass('none-scroll')
}

function addbirzh_show() {
    $("#pop-add-birzh").addClass('active')
    $("#pop-add-client").removeClass('active')
    $("body").addClass('none-scroll')
}
function addbirzh_close() {
    $("#pop-add-birzh").removeClass('active')
    $("body").removeClass('none-scroll')
}
/* summa */
function onChange__form() {
    const form_summa_vivod = document.querySelector('#form_summa_vivod')
    const kolvo_1_row = document.querySelector('#form-body-1-row .kolvo input');
    const summa_1_row = document.querySelector('#form-body-1-row .summa input');
    const kolvo_2_row = document.querySelector('#form-body-2-row .kolvo input');
    const summa_2_row = document.querySelector('#form-body-2-row .summa input');
    const kolvo_3_row = document.querySelector('#form-body-3-row .kolvo input');
    const summa_3_row = document.querySelector('#form-body-3-row .summa input');
    const kolvo_4_row = document.querySelector('#form-body-4-row .kolvo input');
    const summa_4_row = document.querySelector('#form-body-4-row .summa input');
    const kolvo_5_row = document.querySelector('#form-body-5-row .kolvo input');
    const summa_5_row = document.querySelector('#form-body-5-row .summa input');

    const kolvo_summa_1_row = kolvo_1_row.value * summa_1_row.value
    const kolvo_summa_2_row = kolvo_2_row.value * summa_2_row.value
    const kolvo_summa_3_row = kolvo_3_row.value * summa_3_row.value
    const kolvo_summa_4_row = kolvo_4_row.value * summa_4_row.value
    const kolvo_summa_5_row = kolvo_5_row.value * summa_5_row.value

    const form__summa = kolvo_summa_1_row + kolvo_summa_2_row + kolvo_summa_3_row + kolvo_summa_4_row + kolvo_summa_5_row

    form_summa_vivod.innerHTML= form__summa;

    const summField = document.querySelector('#summ');
    summField.value = form__summa;

    $('.form-body-block-input').on('input', $('.form-body-row'), function () {
        onChange__form
    });
}

/* select2 */
$(document).ready(function () {
    $('select').select2({
        language: "ru",
        required: 'false'
    });

    $('.tovar-geo select').select2({
        placeholder: 'ГЕО',
        closeOnSelect: false,
        language: "ru",
        required: 'false',
    })
});

/* Связка */
const label_toggle_btn = document.getElementById("form-body-label-btn");
label_toggle_btn.addEventListener("click", () => label_toggle_btn.classList.toggle("active"));


$('.form-body-block-input').on('select2:unselect', $('.form-body-row') , function () {
    if ($(".select2-selection__rendered .select2-selection__choice").length == 0 ) {
        if ($(".form-body-row").siblings().find('.done').length > 1) {
            $(this).siblings().find('input, .select2-selection').addClass('prompt').attr('required', '');
            $(this).find('.select2-selection').removeClass('done');
        } else {
            $(this).siblings().find('input, .select2-selection').removeClass('done prompt')
            $(this).find('.select2-selection').removeClass('done prompt');
        }
    } else {
        $(this).siblings().find('input, .select2-selection').addClass('prompt').attr('required', '');
        $(this).find('.select2-selection').addClass('done');
    }
});

$('.form-body-block-input').on('select2:select', $('.form-body-row') , function (e) {
    if (e.params.data.id == "none") {
        if ($(".form-body-row").siblings().find('.done').length > 1) {
            $(this).siblings().find('input, .select2-selection').addClass('prompt').attr('required', '');
            $(this).find('.select2-selection').removeClass('done');
        } else {
            $(this).siblings().find('input, .select2-selection').removeClass('prompt')
            $(this).find('.select2-selection').removeClass('done prompt');
        }
    } else {
        $(this).siblings().find('input, .select2-selection').addClass('prompt').attr('required', '');
        $(this).find('.select2-selection').addClass('done');
    }
});


$('.form-body-block-input').on('input', $('.form-body-row'), function () {
    if ($(this).find('input').val() == "") {
        if ($(".form-body-row").siblings().find('.done').length > 1) {
            $(this).siblings().find('input, .select2-selection').addClass('prompt').attr('required', '');
            $(this).find('input').removeClass('done');
        } else {
            $(this).siblings().find('input, .select2-selection').removeClass('prompt')
            $(this).find('input').removeClass('done prompt');
        }
    } else {
        $(this).siblings().find('input, .select2-selection').addClass('prompt').attr('required', '');
        $(this).find('input').addClass('done');
    }
});

function form_body_clone(form_body_row_append, form_body_row_copy) {
    /* REMOVE */
    $(form_body_row_append).find(".select2-selection__rendered, input").remove()
    /* CLONE */
    $(form_body_row_copy).find(".birzha-name .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .birzha-name .select2-selection`)
    $(form_body_row_copy).find(".summa input").clone().appendTo(`${form_body_row_append} .summa`)
    $(form_body_row_copy).find(".kolvo input").clone().appendTo(`${form_body_row_append} .kolvo`)
    $(form_body_row_copy).find(".comment input").clone().appendTo(`${form_body_row_append} .comment`)
    $(form_body_row_copy).find(".type-email .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .type-email .select2-selection`)
    $(form_body_row_copy).find(".type-number .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .type-number .select2-selection`)
    $(form_body_row_copy).find(".tovar-emulator .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .tovar-emulator .select2-selection`)
    $(form_body_row_copy).find(".tovar-rezident .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .tovar-rezident .select2-selection`)
    $(form_body_row_copy).find(".tovar-geo .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .tovar-geo .select2-selection`)

    /* check class */
    if ($(form_body_row_copy).find(".birzha-name .select2-selection").is('.done')) {
        $(form_body_row_append).find(".birzha-name .select2-selection").addClass("done")
    }
    if ($(form_body_row_copy).find(".birzha-name .select2-selection").is('.prompt')) {
        $(form_body_row_append).find(".birzha-name .select2-selection").addClass("prompt")
    }
    if ($(form_body_row_copy).find(".type-email .select2-selection").is('.done')) {
        $(form_body_row_append).find(".type-email .select2-selection").addClass("done")
    }
    if ($(form_body_row_copy).find(".type-email .select2-selection").is('.prompt')) {
        $(form_body_row_append).find(".type-email .select2-selection").addClass("prompt")
    }
    if ($(form_body_row_copy).find(".type-number .select2-selection").is('.done')) {
        $(form_body_row_append).find(".type-number .select2-selection").addClass("done")
    }
    if ($(form_body_row_copy).find(".type-number .select2-selection").is('.prompt')) {
        $(form_body_row_append).find(".type-number .select2-selection").addClass("prompt")
    }
    if ($(form_body_row_copy).find(".tovar-emulator .select2-selection").is('.done')) {
        $(form_body_row_append).find(".tovar-emulator .select2-selection").addClass("done")
    }
    if ($(form_body_row_copy).find(".tovar-emulator .select2-selection").is('.prompt')) {
        $(form_body_row_append).find(".tovar-emulator .select2-selection").addClass("prompt")
    }
    if ($(form_body_row_copy).find(".tovar-rezident .select2-selection").is('.done')) {
        $(form_body_row_append).find(".tovar-rezident .select2-selection").addClass("done")
    }
    if ($(form_body_row_copy).find(".tovar-rezident .select2-selection").is('.prompt')) {
        $(form_body_row_append).find(".tovar-rezident .select2-selection").addClass("prompt")
    }
    if ($(form_body_row_copy).find(".tovar-geo .select2-selection").is('.done')) {
        $(form_body_row_append).find(".tovar-geo .select2-selection").addClass("done")
    }
    if ($(form_body_row_copy).find(".tovar-geo .select2-selection").is('.prompt')) {
        $(form_body_row_append).find(".tovar-geo .select2-selection").addClass("prompt")
    }

    onChange__form()
}

$("#id_client option:first-child").attr('value', 'none')
$('#id_client').on('select2:select', $('.form-body-row') , function (e) {
    if (e.params.data.id != "none") {
		$('.form-body-add-zakaz .form-body-block-input .pop-window-open-btn').removeClass('fa-plus').addClass('fa-pencil').attr('onclick', 'editclient_show()')
	} else if (e.params.data.id == "none") {
		$('.form-body-add-zakaz .form-body-block-input .pop-window-open-btn').removeClass('fa-pencil').addClass('fa-plus').attr('onclick', 'addclient_show()')
	}
});

// Sorting
$('.form-table-name h5').on('click', function(){
    if ($(this).find('i').is('.active')) {
        $(this).find("i").removeClass('active');
    } else {
        $('.form-table-name h5 i').removeClass('active');
        $(this).find("i").addClass('active');
    }
})



// Куки
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

//Сохранение страницы менеджера
$(document).ready(function() {
      var form = $('#save_form');

      // Обработчик события change для input
      form.on('change', 'input', function(event) {
        var field = $(this);
        var fieldId = field.attr('name');
        var fieldValue = field.val();

        console.log(fieldId);
        console.log(fieldValue);

        var data = {
          fieldId: fieldId,
          fieldValue: fieldValue
        };

        // Отправка данных формы через AJAX
        $.ajax({
          url: '/save-data/',
          type: 'POST',
          dataType: 'json',
          data: JSON.stringify(data),
          contentType: 'application/json',
          headers: {
            'X-CSRFToken': getCookie('csrftoken')
          },
          success: function(response) {
            // Обработка успешного ответа сервера
          },
          error: function(xhr, textStatus, error) {
            // Обработка ошибки
          }
        });
      });

      // Обработчик события change для select (включая Select2)
      form.on('change', 'select', function(event) {
        var field = $(this);
        var fieldId = field.attr('name');
        var fieldValue = field.val();

        console.log(field);

        var data = {
          fieldId: fieldId,
          fieldValue: fieldValue
        };
        console.log(data)
        // Отправка данных формы через AJAX
        $.ajax({
          url: '/save-data/',
          type: 'POST',
          dataType: 'json',
          data: JSON.stringify(data),
          contentType: 'application/json',
          headers: {
            'X-CSRFToken': getCookie('csrftoken')
          },
          success: function(response) {
            console.log('ok')
            // Обработка успешного ответа сервера
          },
          error: function(xhr, textStatus, error) {
            console.log('error')
            // Обработка ошибки
          }
        });
      });
    });

//Информация о заказе
function orderInfo(orderId) {
	var csrftoken = getCookie('csrftoken');
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/info_order/', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('X-CSRFToken', csrftoken);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var response = JSON.parse(xhr.responseText);
			var orders = response.orders;
			var products = response.products;

			// Обработка данных заказа
			var orderData = orders[0];
			// Товар
			$("#leftbar-id").text(orderData.id)
			$("#leftbar-date").text(orderData.date)
			$("#leftbar-deadline").text(orderData.deadline)
			$("#leftbar-client").text(orderData.client)
			$("#leftbar-summ").text(orderData.summ)
			$("#leftbar-order-type").text(orderData.order_type)
			$("#leftbar-status").text(orderData.status)
			$("#leftbar-exchange").text(orderData.exchange)
			$("#leftbar-bundle").text(orderData.bundle)
			//console.log(orderData)

			// Обработка данных товаров
			for (i=0; i<products.length; i++){
				//console.log(products[i])
				// Заказ
				$("#leftbar-exchange").text(products[i].exchange)
				$("#leftbar-price").text(products[i].price)
				$("#leftbar-quantity").text(products[i].quantity)
				$("#leftbar-comment").text(products[i].comment)
				$("#leftbar-mailtype").text(products[i].mail_type)
				$("#leftbar-type-number").text(products[i].type_of_number)
				$("#leftbar-emulator").text(products[i].emulator)
				$("#leftbar-resident").text(products[i].resident)
				$("#leftbar-geo").text(products[i].geo_id)
			}
		}
	};

	var data = JSON.stringify({ orderId: orderId });
	console.log(data)
	xhr.send(data);
}