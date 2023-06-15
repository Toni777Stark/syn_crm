$(".comment input").attr("id", "")


const addclient = document.getElementById("pop-add-client")
const addbirzh = document.getElementById("pop-add-birzh")

function addclient_show() {
    addbirzh.classList.remove('active')
    addclient.classList.add('active')
    body.classList.add('none-scroll')
}
function addclient_close() {
    addclient.classList.remove('active')
    body.classList.remove('none-scroll')
}

function addbirzh_show() {
    addbirzh.classList.add('active')
    addclient.classList.remove('active')
    body.classList.add('none-scroll')
}
function addbirzh_close() {
    addbirzh.classList.remove('active')
    body.classList.remove('none-scroll')
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
    $('.form-body-block-input').on('input', $('.form-body-row'), function () {
        onChange__form
    });
}

/* select2 */
$(document).ready(function () {
//change selectboxes to selectize mode to be searchable
    $('select').select2({
        language: "ru",
    });

    $('select[name="tovar-geo"]').select2({
        placeholder: 'ГЕО',
        closeOnSelect: false,
        language: "ru",
    })
});


/* Связка */
const label_toggle_btn = document.getElementById("form-body-label-btn");
label_toggle_btn.addEventListener("click", () => label_toggle_btn.classList.toggle("active"));

const select_check = $('.form-body-block-input').on('select2:select', $('.form-body-row') , function (e) {
    if (e.params.data.id == "none") {
        $(this).siblings().find('input, .select2-selection').removeClass('prompt').removeAttr('required', '');
        $(this).find('.select2-selection').removeClass('done');
    } else {
        $(this).siblings().find('input, .select2-selection').addClass('prompt').attr('required', '');
        $(this).find('.select2-selection').addClass('done');
    }
});


const input_check = $('.form-body-block-input').on('input', $('.form-body-row'), function () {
    if ($(this).find('input').val() >= 1) {
        $(this).find('input').addClass('done')
        $(this).siblings().find('input, .select2-selection').addClass('prompt').attr('required', '');
    } else {
        $(this).find('input').removeClass('done')
        $(this).siblings().find('input, .select2-selection').removeClass('prompt').removeAttr('required');
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


$('.form-table-name h5').on('click', function(){
    $('.form-table-name h5 i').removeClass('active');
    $(this).find("i").addClass('active');
});