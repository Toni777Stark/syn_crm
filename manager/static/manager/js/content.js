$(".comment input").attr("id", "")
$(".tovar-geo select").attr({
    'multiple': '',
    'data-maximum-selection-length': '2'
})
$("#form-body-1-row div select, #form-body-1-row div input, #client-body-row div select, #client-body-row div input").attr('required','')


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
	var csrftoken = getCookie('csrftoken');
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/edit-client/', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('X-CSRFToken', csrftoken);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
            if (response.success) {
                var formHtml = response.form_html;
                var formData = response.formData;
                $("#pop-add-birzh, #pop-add-client").removeClass('active');
                $("#pop-edit-client").addClass('active');
                $("body").addClass('none-scroll');
                console.log(formData)
                var form = document.getElementById('edit-client-form');
                var nameInput = form.querySelector('#id_name');
                var tgInput = form.querySelector('#id_tg');
                var statusInput = form.querySelector('#id_status');
                var langInput = form.querySelector('#id_lang');

                // Вставка значений в поля формы
                nameInput.value = formData.name;
                tgInput.value = formData.tg;
                statusInput.value = formData.status;
                langInput.value = formData.lang;
            } else {
                // Обработка ошибок, если необходимо
            }
        }
    }
    const selectElement = document.getElementById('id_client');
    const selectedValue = selectElement.value;
    console.log(selectedValue);

	var data = JSON.stringify({ client: selectedValue });
	console.log(data)
	xhr.send(data);
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
}
/* select2 */
$(document).ready(function () {
    $('select').select2({
        language: "ru",
    });
    
    $('.tovar-geo select').select2({
        placeholder: 'ГЕО',
        closeOnSelect: false,
        language: "ru",
    })

});

/* Связка */
const label_toggle_btn = document.getElementById("form-body-label-btn");
label_toggle_btn.addEventListener("click", () => label_toggle_btn.classList.toggle("active"));


function form_body_clone(form_body_row_append, form_body_row_copy) {
    /* REMOVE */
    $(form_body_row_append).find(".select2-selection__rendered").remove()
    $(form_body_row_append).find(".comment input, .summa input, .kolvo input").val("")
    /* CLONE */
    $(form_body_row_copy).find(".birzha-name .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .birzha-name .select2-selection`)
    
    var summa_value = $(form_body_row_copy).find(".summa input").val()
    var kolvo_value = $(form_body_row_copy).find(".kolvo input").val()
    var comment_value = $(form_body_row_copy).find(".comment input").val()
    $(form_body_row_append).find(".summa input").val(summa_value)
    $(form_body_row_append).find(".kolvo input").val(kolvo_value)
    $(form_body_row_append).find(".comment input").val(comment_value)

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
    if ($(form_body_row_copy).find(".summa input").is('.done')) {
        $(form_body_row_append).find(".summa input").addClass("done")
    }
    if ($(form_body_row_copy).find(".summa input").is('.prompt')) {
        $(form_body_row_append).find(".summa input").addClass("prompt")
    }
    if ($(form_body_row_copy).find(".kolvo input").is('.done')) {
        $(form_body_row_append).find(".kolvo input").addClass("done")
    }
    if ($(form_body_row_copy).find(".kolvo input").is('.prompt')) {
        $(form_body_row_append).find(".kolvo input").addClass("prompt")
    }
    if ($(form_body_row_copy).find(".comment input").is('.done')) {
        $(form_body_row_append).find(".comment input").addClass("done")
    }
    if ($(form_body_row_copy).find(".comment input").is('.prompt')) {
        $(form_body_row_append).find(".comment input").addClass("prompt")
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
    validate_form($(form_body_row_append).attr("data-number-row"))
}


function form_client_icon_toggle() {
    if ($("#id_client option:selected").val() != "") {
		$('.form-body-add-zakaz .form-body-block-input .pop-window-open-btn').removeClass('fa-plus').addClass('fa-pencil').attr('onclick', 'editclient_show()')
	} else if ($("#id_client option:selected").val() == "") {
		$('.form-body-add-zakaz .form-body-block-input .pop-window-open-btn').removeClass('fa-pencil').addClass('fa-plus').attr('onclick', 'addclient_show()')
	}
    $('#id_client').on('select2:select', function () {
        form_client_icon_toggle()
    });
}


// Sorting
$('.form-table-name h5').on('click', function(){
    if ($(this).find('i').is('.active')) {
        if ($(this).find('i').is('.fa-angle-down')) {
            $(this).find('i').removeClass('fa-angle-down')
            $(this).find('i').addClass('fa-angle-up')
        } else {
            $(this).find('i').addClass('fa-angle-down');
            $('.form-table-name h5 i').removeClass('fa-angle-up active');
        }
    } else {
        $('.form-table-name h5 i').removeClass('active');
        $(this).find("i").addClass('active');
    }
})


//Сохранение страницы менеджера
$(document).ready(function() {
      var form = $('#save_form');

      // Обработчик события change для input
      form.on('change', 'input', function(event) {
        var field = $(this);
        var fieldId = field.attr('name');
        var fieldValue = field.val();
        var fieldClass = field.attr("class")

        console.log("Input Id - ",fieldId);
        console.log("Input Value - ",fieldValue);
        console.log("Input Class - ",fieldClass)

        var data = {
          fieldId: fieldId,
          fieldValue: fieldValue,
          fieldClass: fieldClass
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
            //$('.btn-add-zakaz-lower').removeClass('error').fadeIn().text('Успешно!').delay( 2000 ).fadeOut()
          },
          error: function(xhr, textStatus, error) {
            //$('.btn-add-zakaz-lower').addClass('error').fadeIn().text(error).delay( 2000 ).fadeOut()
          }
        });
      });

      // Обработчик события change для select (включая Select2)
      form.on('change', 'select', function(event) {
        var field = $(this);
        var fieldId = field.attr('name');
        var fieldValue = field.val();
        var fieldClass = field.parent().find(".select2-selection").attr("class")

        console.log("Select field - ",field);
        console.log("Select class - ",fieldClass);

        var data = {
          fieldId: fieldId,
          fieldValue: fieldValue,
          fieldClass: fieldClass
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
            console.log(products)
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
			var productsContainer = $("#products-container");
            productsContainer.empty(); // Очистка контейнера товаров перед заполнением

            for (var i = 0; i < products.length; i++) {
                var product = products[i];

                var productBlock = $("<div>").addClass("product-block");
                var productElBlock1 = $("<div>").addClass("product-element-block");
                var productElBlock2 = $("<div>").addClass("product-element-block");
                var productElBlock3 = $("<div>").addClass("product-element-block");
                var productElBlock4 = $("<div>").addClass("product-element-block");
                var productElBlock5 = $("<div>").addClass("product-element-block");
                var productElBlock6 = $("<div>").addClass("product-element-block");
                var productElBlock7 = $("<div>").addClass("product-element-block");
                var productElBlock8 = $("<div>").addClass("product-element-block");
                var productElBlock9 = $("<div>").addClass("product-element-block");

                var name = $("<h4>").text("Товар " + (i+1))
                productBlock.append(name);

                var exchange = $("<h5>").addClass("product-name").text("Биржа:");
                var exchangeValue = $("<h6>").text(product.exchange);
                productElBlock1.append(exchange, exchangeValue);

                var price = $("<h5>").addClass("product-name").text("Цена:");
                var priceValue = $("<h6>").text(product.price);
                productElBlock2.append(price, priceValue);

                var quantity = $("<h5>").addClass("product-name").text("Кол-во:");
                var quantityValue = $("<h6>").text(product.quantity);
                productElBlock3.append(quantity, quantityValue);

                var comment = $("<h5>").addClass("product-name").text("Комментарий:");
                var commentValue = $("<h6>").text(product.comment);
                productElBlock4.append(comment, commentValue);

                var mailType = $("<h5>").addClass("product-name").text("Тип почты:");
                var mailTypeValue = $("<h6>").text(product.mail_type);
                productElBlock5.append(mailType, mailTypeValue);

                var typeOfNumber = $("<h5>").addClass("product-name").text("Тип номера:");
                var typeOfNumberValue = $("<h6>").text(product.type_of_number);
                productElBlock6.append(typeOfNumber, typeOfNumberValue);

                var emulator = $("<h5>").addClass("product-name").text("Эмулятор:");
                var emulatorValue = $("<h6>").text(product.emulator);
                productElBlock7.append(emulator, emulatorValue);

                var resident = $("<h5>").addClass("product-name").text("Резидент:");
                var residentValue = $("<h6>").text(product.resident);
                productElBlock8.append(resident, residentValue);

                var geo = $("<h5>").addClass("product-name").text("ГЕО:");
                var geoValue = $("<h6>").text(product.geo_id);
                productElBlock9.append(geo, geoValue);

                productBlock.append(productElBlock1)
                productBlock.append(productElBlock2)
                productBlock.append(productElBlock3)
                productBlock.append(productElBlock4)
                productBlock.append(productElBlock5)
                productBlock.append(productElBlock6)
                productBlock.append(productElBlock7)
                productBlock.append(productElBlock8)
                productBlock.append(productElBlock9)
                productsContainer.append(productBlock);
			}
		}
	};

	var data = JSON.stringify({ orderId: orderId });
	console.log(data)
	xhr.send(data);
}

// Пример:
// $("#form-body-1-row .birzha-name .select2-selection__rendered")
$(".birzha-name .select2-selection__rendered").attr("title")
$(".summa input").val()
$(".kolvo input").val()
$(".comment input").val()
$(".type-email .select2-selection__rendered").attr("title")
$(".type-number .select2-selection__rendered").attr("title")
$(".tovar-emulator .select2-selection__rendered").attr("title")
$(".tovar-rezident .select2-selection__rendered").attr("title")

function validate_form(form_row_number) {
    $( `#form-body-${form_row_number}-row .form-body-block-input` ).each(function() {
        if ($(this).find("input, select").val() != "" || $(this).find(".select2-selection__choice").length != 0 ) {
            $(this).find(".select2-selection, input").addClass("done")
        } else {
            $(this).find(".select2-selection, input").addClass("prompt")
            $(this).find(".select2-selection, input").removeClass("done")
        }
    });
}
function check_validation() {
    $( `.form-body-row .form-body-block-input` ).each(function() {
        if($(this).find("select, input").val() != "") {
            validate_form($(this).parent().attr("data-number-row"))
        }
    })    
}
/* Запуск валидации и функций при загрузке страницы */
$(document).ready(function () {
    form_client_icon_toggle()
    onChange__form()
    validate_form(0)
    validate_form(1)
    check_validation()
});
$("select, input").on('select2:select select2:unselect input', function () {
    validate_form($(this).parent().parent().attr("data-number-row"))
});
