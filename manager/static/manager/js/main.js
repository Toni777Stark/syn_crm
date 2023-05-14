/* Когда пользователь нажимает на кнопку,
переключение между скрытием и отображением раскрывающегося содержимого */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Закройте выпадающее меню, если пользователь щелкает за его пределами
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

const body = document.querySelector("body")

const addclient = document.getElementById("pop-add-client")

const addbirzh = document.getElementById("pop-add-birzh")

const left_bar = document.getElementById("left-bar")
const side_bar = document.getElementById("side-bar")
const content_block = document.getElementById("content-block")
const open_btn = document.getElementById("openSide_bar")
const close_btn = document.getElementById("closeSide_bar")

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



const label_toggle_btn = document.getElementById("form-body-label-btn");
label_toggle_btn.addEventListener("click", () => label_toggle_btn.classList.toggle("active"));

function openSide_bar() {
  side_bar.classList.remove('active')
  open_btn.classList.remove('active')
  close_btn.classList.remove('active')
  content_block.classList.remove('active-content-block')
}
function closeSide_bar() {
  side_bar.classList.add('active')
  open_btn.classList.add('active')
  close_btn.classList.add('active')
  content_block.classList.add('active-content-block')
}


function add_geo_clone_1_row() {
    $( '.clone-geo:last' ).clone() // создаем копию первого элемента формы
      .css({"display":"flex"})
          .appendTo( ".form-body-row-block>.form-body-row:nth-child(1)" ); // вставляем клонированный элемент
};
function add_geo_clone_2_row() {
    $( '.clone-geo:last' ).clone() // создаем копию первого элемента формы
      .css({"display":"flex"})
          .appendTo( ".form-body-row-block>.form-body-row:nth-child(2)" ); // вставляем клонированный элемент
};

function add_geo_clone_3_row() {
  $( '.clone-geo:last' ).clone() // создаем копию первого элемента формы
    .css({"display":"flex"})
        .appendTo( ".form-body-row-block>.form-body-row:nth-child(3)" ); // вставляем клонированный элемент
};
function add_geo_clone_4_row() {
    $( '.clone-geo:last' ).clone() // создаем копию первого элемента формы
      .css({"display":"flex"})
          .appendTo( ".form-body-row-block>.form-body-row:nth-child(4)" ); // вставляем клонированный элемент
};

function add_geo_clone_5_row() {
  $( '.clone-geo:last' ).clone() // создаем копию первого элемента формы
    .css({"display":"flex"})
        .appendTo( ".form-body-row-block>.form-body-row:nth-child(5)" ); // вставляем клонированный элемент
};
function remove_geo_clone() {
    $( ".clone-geo" ).css({"display":"none"})
};










function submit__form() {
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
  
  const kolvo_summa_1_row = kolvo_1_row.value * summa_1_row.value
  const kolvo_summa_2_row = kolvo_2_row.value * summa_2_row.value
  const kolvo_summa_3_row = kolvo_3_row.value * summa_3_row.value
  const kolvo_summa_4_row = kolvo_4_row.value * summa_4_row.value
  const kolvo_summa_5_row = kolvo_5_row.value * summa_5_row.value

  const form__summa = kolvo_summa_1_row + kolvo_summa_2_row + kolvo_summa_3_row + kolvo_summa_4_row + kolvo_summa_5_row  

  form_summa_vivod.innerHTML= form__summa;
}
