/* Когда пользователь нажимает на кнопку,
переключение между скрытием и отображением раскрывающегося содержимого */


const left_bar = document.getElementById("left-bar")
const side_bar = document.getElementById("side-bar")
const content_block = document.getElementById("content-block")
const open_btn = document.getElementById("openSide_bar")

function openleft_bar() {
  left_bar.classList.add('active')
}
function closeleft_bar() {
  left_bar.classList.remove('active')
}



function openSide_bar() {
  side_bar.classList.remove('active')
  open_btn.classList.remove('active')
  content_block.classList.remove('active-content-block')
}
function closeSide_bar() {
  side_bar.classList.add('active')
  open_btn.classList.add('active')
  content_block.classList.add('active-content-block')
}





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