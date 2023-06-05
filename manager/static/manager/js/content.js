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


const form_summa_vivod = document.querySelector('#form_summa_vivod')


const kolvo_1_row = document.getElementById('input-kolvo-1-row');
const summa_1_row = document.getElementById('input-summa-1-row');

const kolvo_2_row = document.getElementById('input-kolvo-2-row');
const summa_2_row = document.getElementById('input-summa-2-row');

const kolvo_3_row = document.getElementById('input-kolvo-3-row');
const summa_3_row = document.getElementById('input-summa-3-row');

const kolvo_4_row = document.getElementById('input-kolvo-4-row');
const summa_4_row = document.getElementById('input-summa-4-row');

const kolvo_5_row = document.getElementById('input-kolvo-5-row');
const summa_5_row = document.getElementById('input-summa-5-row');


/* summa */
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
    $(this).siblings().find('input, .select2-container--default .select2-selection--single, .select2-container--default.select2-container--focus .select2-selection--multiple, .select2-container--default .select2-selection--multiple').addClass('prompt');
    $(this).find('.select2-container--default .select2-selection--single, .select2-container--default .select2-selection--multiple').addClass('done');
});

const input_check = $('.form-body-block-input').on('change', $('.form-body-row'), function () {
    $(this).siblings().find('input, .select2-container--default .select2-selection--single, .select2-container--default.select2-container--focus .select2-selection--multiple, .select2-container--default .select2-selection--multiple').addClass('prompt');
    $(this).find('input').addClass('done');
});

function form_body_copy_1_row() {

    $("#birzha-name-2-row .select2-selection__rendered").closest("#birzha-name-2-row .select2-selection__rendered").remove();
    $("#comment-2-row input").closest("#comment-2-row input").remove();
    $("#input-kolvo-2-row").closest("#input-kolvo-2-row").remove();
    $("#input-summa-2-row").closest("#input-summa-2-row").remove();
    $("#type-email-2-row .select2-selection__rendered").closest("#type-email-2-row .select2-selection__rendered").remove();
    $("#type-number-2-row .select2-selection__rendered").closest("#type-number-2-row .select2-selection__rendered").remove();
    $("#tovar-emulator-2-row .select2-selection__rendered").closest("#tovar-emulator-2-row .select2-selection__rendered").remove();
    $("#tovar-geo-2-row .select2-selection__rendered").closest("#tovar-geo-2-row .select2-selection__rendered").remove();

    $('#birzha-name-1-row .select2-selection__rendered').clone().appendTo("#birzha-name-2-row .select2-selection");
    $('#input-summa-1-row').clone().attr({"id":"input-summa-2-row"}).appendTo("#summa-2-row")
    $('#input-kolvo-1-row').clone().attr({"id":"input-kolvo-2-row"}).appendTo("#kolvo-2-row")
    $('#comment-1-row input').clone().appendTo("#comment-2-row")
    $('#type-email-1-row .select2-selection__rendered').clone().appendTo("#type-email-2-row .select2-selection");
    $('#type-number-1-row .select2-selection__rendered').clone().appendTo("#type-number-2-row .select2-selection");
    $('#tovar-emulator-1-row .select2-selection__rendered').clone().appendTo("#tovar-emulator-2-row .select2-selection");
    $('#tovar-geo-1-row .select2-selection__rendered').clone().appendTo("#tovar-geo-2-row .select2-selection");

    onChange__form()
    select_check.name
    input_check.name
};


function form_body_copy_2_row() {

    $("#birzha-name-3-row .select2-container .select2-selection .select2-selection__rendered").closest("#birzha-name-3-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#comment-3-row input").closest("#comment-3-row input").remove();
    $("#input-kolvo-3-row").closest("#input-kolvo-3-row").remove();
    $("#input-summa-3-row").closest("#input-summa-3-row").remove();
    $("#type-email-3-row .select2-container .select2-selection .select2-selection__rendered").closest("#type-email-3-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#type-number-3-row .select2-container .select2-selection .select2-selection__rendered").closest("#type-number-3-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#tovar-emulator-3-row .select2-container .select2-selection .select2-selection__rendered").closest("#tovar-emulator-3-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#tovar-geo-3-row .select2-container .select2-selection .select2-selection__rendered").closest("#tovar-geo-3-row .select2-container .select2-selection .select2-selection__rendered").remove();

    $('#birzha-name-2-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#birzha-name-3-row .select2-container .select2-selection");
    $('#input-summa-2-row').clone().attr({"id":"input-summa-3-row"}).appendTo("#summa-3-row")
    $('#input-kolvo-2-row').clone().attr({"id":"input-kolvo-3-row"}).appendTo("#kolvo-3-row")
    $('#comment-2-row input').clone().appendTo("#comment-3-row")
    $('#type-email-2-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#type-email-3-row .select2-container .select2-selection");
    $('#type-number-2-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#type-number-3-row .select2-container .select2-selection");
    $('#tovar-emulator-2-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#tovar-emulator-3-row .select2-container .select2-selection");
    $('#tovar-geo-2-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#tovar-geo-3-row .select2-container .select2-selection");
    


    onChange__form()
};


function form_body_copy_3_row() {

    $("#birzha-name-4-row .select2-container .select2-selection .select2-selection__rendered").closest("#birzha-name-4-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#comment-4-row input").closest("#comment-4-row input").remove();
    $("#input-kolvo-4-row").closest("#input-kolvo-4-row").remove();
    $("#input-summa-4-row").closest("#input-summa-4-row").remove();
    $("#type-email-4-row .select2-container .select2-selection .select2-selection__rendered").closest("#type-email-4-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#type-number-4-row .select2-container .select2-selection .select2-selection__rendered").closest("#type-number-4-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#tovar-emulator-4-row .select2-container .select2-selection .select2-selection__rendered").closest("#tovar-emulator-4-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#tovar-geo-4-row .select2-container .select2-selection .select2-selection__rendered").closest("#tovar-geo-4-row .select2-container .select2-selection .select2-selection__rendered").remove();

    $('#birzha-name-3-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#birzha-name-4-row .select2-container .select2-selection");
    $('#input-summa-3-row').clone().attr({"id":"input-summa-4-row"}).appendTo("#summa-4-row")
    $('#input-kolvo-3-row').clone().attr({"id":"input-kolvo-4-row"}).appendTo("#kolvo-4-row")
    $('#comment-3-row input').clone().appendTo("#comment-4-row")
    $('#type-email-3-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#type-email-4-row .select2-container .select2-selection");
    $('#type-number-3-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#type-number-4-row .select2-container .select2-selection");
    $('#tovar-emulator-3-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#tovar-emulator-4-row .select2-container .select2-selection");
    $('#tovar-geo-3-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#tovar-geo-4-row .select2-container .select2-selection");
    


    onChange__form()
};


function form_body_copy_4_row() {

    $("#birzha-name-5-row .select2-container .select2-selection .select2-selection__rendered").closest("#birzha-name-5-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#comment-5-row input").closest("#comment-5-row input").remove();
    $("#input-kolvo-5-row").closest("#input-kolvo-5-row").remove();
    $("#input-summa-5-row").closest("#input-summa-5-row").remove();
    $("#type-email-5-row .select2-container .select2-selection .select2-selection__rendered").closest("#type-email-5-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#type-number-5-row .select2-container .select2-selection .select2-selection__rendered").closest("#type-number-5-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#tovar-emulator-5-row .select2-container .select2-selection .select2-selection__rendered").closest("#tovar-emulator-5-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $("#tovar-geo-5-row .select2-container .select2-selection .select2-selection__rendered").closest("#tovar-geo-5-row .select2-container .select2-selection .select2-selection__rendered").remove();

    $('#birzha-name-4-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#birzha-name-5-row .select2-container .select2-selection");
    $('#input-summa-4-row').clone().attr({"id":"input-summa-5-row"}).appendTo("#summa-5-row")
    $('#input-kolvo-4-row').clone().attr({"id":"input-kolvo-5-row"}).appendTo("#kolvo-5-row")
    $('#comment-4-row input').clone().appendTo("#comment-5-row")
    $('#type-email-4-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#type-email-5-row .select2-container .select2-selection");
    $('#type-number-4-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#type-number-5-row .select2-container .select2-selection");
    $('#tovar-emulator-4-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#tovar-emulator-5-row .select2-container .select2-selection");
    $('#tovar-geo-4-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#tovar-geo-5-row .select2-container .select2-selection");
    


    onChange__form()


};
