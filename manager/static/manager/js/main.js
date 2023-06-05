/* Функция для облегчения работы */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$('.btn-add-zakaz').click(function() {
  $('.btn-add-zakaz-lower').addClass('active');
  sleep(2500).then(() => { $('.btn-add-zakaz-lower').removeClass('active'); });
});


/* HEADER */

/* Когда пользователь нажимает на кнопку,
переключение между скрытием и отображением раскрывающегося содержимого */
function drop_show_header() {
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




/* MAIN */
const body = document.querySelector("body")

const left_bar = document.getElementById("left-bar")
const side_bar = document.getElementById("side-bar")
const content_block = document.getElementById("content-block")
const open_btn = document.getElementById("openSide_bar")
const close_btn = document.getElementById("closeSide_bar")


/* main function */
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



/* Закрывает левое меню если нехватает места */
var width = document.documentElement.clientWidth;
if (width <= 1600) {
  closeSide_bar()
}