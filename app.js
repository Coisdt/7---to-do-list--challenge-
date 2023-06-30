const addItemBtn = document.querySelector(".add-btn");
const inputElement = document.querySelector(".to-do-input");
const listContainer = document.querySelector(".list-container");
const toDoList = document.querySelector(".to-do-list");

function addItem() {
  const listItem = document.createElement("li");
  const inputValue = inputElement.value;
  //   if input empty
  if (inputElement.value.trim() === "") {
    return;
  }
  //   add item to list
  listItem.innerHTML = `
  <li class='item'><input class='checkbox' type="checkbox"></input>${inputValue}
  <i class="delete fa-solid fa-trash"></i> 
  <i class="edit fa-solid fa-pencil">
  </i>
  </li>`;
  toDoList.appendChild(listItem);
  //   reset input
  inputElement.value = "";
}

addItemBtn.addEventListener("click", addItem);
