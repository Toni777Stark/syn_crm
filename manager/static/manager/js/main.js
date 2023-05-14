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
}
function addclient_close() {
  addclient.classList.remove('active')
}

function addbirzh_show() {
  addbirzh.classList.add('active')
  addclient.classList.remove('active')
}
function addbirzh_close() {
  addbirzh.classList.remove('active')
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
    $( ".clone-geo" ).css({"display":"none"})};





/* Расчет суммы */
function calc_soue1() {
  var count_soue1_1 = document.getElementById("count_soue1_1");
  var result_soue1_1 = document.getElementById("result_soue1_1");
  var price_soue1_1 = 0;

  price_soue1_1 =  ;
  result_soue1_1.innerHTML = price_soue1_1;
}