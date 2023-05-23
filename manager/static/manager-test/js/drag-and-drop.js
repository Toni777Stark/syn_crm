const main = document.querySelector(".manager-block");


main.addEventListener("dragenter", (e) => {
  if (e.target.classList.contains("list-group")) {
    e.target.classList.add("drop");
  }
});

main.addEventListener("dragleave", (e) => {
  if (e.target.classList.contains("drop")) {
    e.target.classList.remove("drop");
  }
});

main.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("list-group-item")) {
    e.dataTransfer.setData("text/plain", e.target.dataset.id);
  }
});

let elemBelow = "";

main.addEventListener("dragover", (e) => {
  e.preventDefault();

  elemBelow = e.target;
});

main.addEventListener("drop", (e) => {
  const todo = main.querySelector(
    `[data-id="${e.dataTransfer.getData("text/plain")}"]`
  );

  if (elemBelow === todo) {
    return;
  }

  if (elemBelow.classList.contains("list-group-item")) {
    const center =
      elemBelow.getBoundingClientRect().y +
      elemBelow.getBoundingClientRect().height / 2;

    if (e.clientY > center) {
      if (elemBelow.nextElementSibling !== null) {
        elemBelow = elemBelow.nextElementSibling;
      } else {
        return;
      }
    }

    elemBelow.parentElement.insertBefore(todo, elemBelow);
    todo.className = elemBelow.className;
  }

  if (e.target.classList.contains("list-group")) {
    e.target.append(todo);

    if (e.target.classList.contains("drop")) {
      e.target.classList.remove("drop");
    }
  }
});
