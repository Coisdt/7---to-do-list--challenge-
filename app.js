const addItemBtn = document.querySelector(".add-btn");
const inputElement = document.querySelector(".to-do-input");
const listContainer = document.querySelector(".list-container");
const toDoList = document.querySelector(".to-do-list");

function addItem() {
  // create new element
  const listItem = document.createElement("li");
  listItem.setAttribute('class', 'item')
  const inputValue = inputElement.value;
  //   if input empty
  if (inputElement.value.trim() === "") {
    return;
  }
  //   add item to list
  listItem.innerHTML = `
  <input class='checkbox' type="checkbox"></input>${
    inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
  }
  <i class="delete fa-solid fa-trash"></i> 
  <i class="edit fa-solid fa-pencil">
  </i>
  `;
  toDoList.appendChild(listItem);
  //   reset input
  inputElement.value = "";

  const editBtn = document.querySelector(".edit");

  // delete item from list
  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetListItem = e.target.parentElement;
      targetListItem.remove()
    });
  });
}

addItemBtn.addEventListener("click", addItem);


// edit btn

// cross out completed
