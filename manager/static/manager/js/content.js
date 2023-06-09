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

function onChange__form() {

    const kolvo_summa_1_row = kolvo_1_row.value * summa_1_row.value
    const kolvo_summa_2_row = kolvo_2_row.value * summa_2_row.value
    const kolvo_summa_3_row = kolvo_3_row.value * summa_3_row.value
    const kolvo_summa_4_row = kolvo_4_row.value * summa_4_row.value
    const kolvo_summa_5_row = kolvo_5_row.value * summa_5_row.value

    const form__summa = kolvo_summa_1_row + kolvo_summa_2_row + kolvo_summa_3_row + kolvo_summa_4_row + kolvo_summa_5_row  

    form_summa_vivod.innerHTML= form__summa;
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

/* table */
var table_full_page = 3
var table_page = 1

function table_page_left() {
  if (table_page > 1 ) {
    table_page = table_page - 1
    $("#table-page-number").text(table_page);}
}

function table_page_right() {
  if (table_page == table_full_page) {
  } else {
    table_page = table_page + 1
    $("#table-page-number").text(table_page);
  }
}



const select_check = $('.form-body-block-input').on('select2:select', $('.form-body-row') , function () {
    $(this).siblings().find('input, .select2-container--default .select2-selection--single, .select2-container--default.select2-container--focus .select2-selection--multiple, .select2-container--default .select2-selection--multiple').addClass('prompt').attr('required', '').attr('title', 'Обязательное поле');
    $(this).find('.select2-container--default .select2-selection--single, .select2-container--default .select2-selection--multiple').addClass('done').attr('title', 'Обязательное поле');
});

const input_check = $('.form-body-block-input').on('change', $('.form-body-row'), function () {
    $(this).siblings().find('input, .select2-container--default .select2-selection--single, .select2-container--default.select2-container--focus .select2-selection--multiple, .select2-container--default .select2-selection--multiple').addClass('prompt').attr('required', '').attr('title', 'Обязательное поле');
    $(this).find('input').addClass('done').attr('title', 'Обязательное поле');
});

function form_body_clone(form_body_row_append, form_body_row_copy) {
    /* REMOVE */
    $(form_body_row_append).find(".select2-selection__rendered, input").remove()
    /* CLONE */
    $(form_body_row_copy).find(".birzha-name .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .birzha-name .select2-selection`)
    $(form_body_row_copy).find(".summa input").clone().removeClass("done prompt").appendTo(`${form_body_row_append} .summa`)
    $(form_body_row_copy).find(".kolvo input").clone().removeClass("done prompt").appendTo(`${form_body_row_append} .kolvo`)
    $(form_body_row_copy).find(".comment input").clone().removeClass("done prompt").appendTo(`${form_body_row_append} .comment`)
    $(form_body_row_copy).find(".type-email .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .type-email .select2-selection`)
    $(form_body_row_copy).find(".type-number .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .type-number .select2-selection`)
    $(form_body_row_copy).find(".tovar-emulator .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .tovar-emulator .select2-selection`)
    $(form_body_row_copy).find(".tovar-geo .select2-selection__rendered").clone().appendTo(`${form_body_row_append} .tovar-geo .select2-selection`)

    onChange__form()
}
function form_body_copy_1_row() { form_body_clone("#form-body-2-row", "#form-body-1-row") };
function form_body_copy_2_row() { form_body_clone("#form-body-3-row", "#form-body-2-row") };
function form_body_copy_3_row() { form_body_clone("#form-body-4-row", "#form-body-3-row") };
function form_body_copy_4_row() { form_body_clone("#form-body-5-row", "#form-body-4-row") };




// Для обработчика форма
// input value
// кол-во
kolvo_1_row // указывать через $(kolvo_summa).val()
kolvo_2_row // указывать через $(kolvo_summa).val()
kolvo_3_row // указывать через $(kolvo_summa).val()
kolvo_4_row // указывать через $(kolvo_summa).val()
kolvo_5_row // указывать через $(kolvo_summa).val()
// сумма
summa_1_row // указывать через $(kolvo_summa).val()
summa_2_row // указывать через $(kolvo_summa).val()
summa_3_row // указывать через $(kolvo_summa).val()
summa_4_row // указывать через $(kolvo_summa).val()
summa_5_row // указывать через $(kolvo_summa).val()
// select
// биржа
birzha_1_row = $("#form-body-1-row .birzha-name .select2-selection__rendered").text();
birzha_2_row = $("#form-body-2-row .birzha-name .select2-selection__rendered").text();
birzha_3_row = $("#form-body-3-row .birzha-name .select2-selection__rendered").text();
birzha_4_row = $("#form-body-4-row .birzha-name .select2-selection__rendered").text();
birzha_5_row = $("#form-body-5-row .birzha-name .select2-selection__rendered").text();
// тип почты
type_email_1_row = $("#form-body-1-row .type-email .select2-selection__rendered").text();
type_email_2_row = $("#form-body-2-row .type-email .select2-selection__rendered").text();
type_email_3_row = $("#form-body-3-row .type-email .select2-selection__rendered").text();
type_email_4_row = $("#form-body-4-row .type-email .select2-selection__rendered").text();
type_email_5_row = $("#form-body-5-row .type-email .select2-selection__rendered").text();
// тип номера
type_number_1_row = $("#form-body-1-row .type-number .select2-selection__rendered").text();
type_number_2_row = $("#form-body-2-row .type-number .select2-selection__rendered").text();
type_number_3_row = $("#form-body-3-row .type-number .select2-selection__rendered").text();
type_number_4_row = $("#form-body-4-row .type-number .select2-selection__rendered").text();
type_number_5_row = $("#form-body-5-row .type-number .select2-selection__rendered").text();
// тип почты
tovar_emulator_1_row = $("#form-body-1-row .tovar-emulator .select2-selection__rendered").text();
tovar_emulator_2_row = $("#form-body-2-row .tovar-emulator .select2-selection__rendered").text();
tovar_emulator_3_row = $("#form-body-3-row .tovar-emulator .select2-selection__rendered").text();
tovar_emulator_4_row = $("#form-body-4-row .tovar-emulator .select2-selection__rendered").text();
tovar_emulator_5_row = $("#form-body-5-row .tovar-emulator .select2-selection__rendered").text();
// тип почты
tovar_geo_1_row = $("#form-body-1-row .tovar-geo .select2-selection__rendered").text();
tovar_geo_2_row = $("#form-body-2-row .tovar-geo .select2-selection__rendered").text();
tovar_geo_3_row = $("#form-body-3-row .tovar-geo .select2-selection__rendered").text();
tovar_geo_4_row = $("#form-body-4-row .tovar-geo .select2-selection__rendered").text();
tovar_geo_5_row = $("#form-body-5-row .tovar-geo .select2-selection__rendered").text();
console.log(tovar_emulator_4_row)