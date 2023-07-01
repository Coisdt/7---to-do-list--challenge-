const addItemBtn = document.querySelector(".add-btn");
const inputElement = document.querySelector(".to-do-input");
const listContainer = document.querySelector(".list-container");
const toDoList = document.querySelector(".to-do-list");

function addItem() {
  // create new element
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "item");
  let inputValue = inputElement.value;
  //   if input empty
  if (inputElement.value.trim() === "") {
    return;
  }
  //   add item to list
  listItem.innerHTML = `
  <input class='checkbox' type="checkbox"></input>${
    inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
  }
  <i class="edit fa-solid fa-pencil">
  </i>
  <i class="delete fa-solid fa-trash"></i> 
  `;
  toDoList.appendChild(listItem);
  //   reset input
  inputElement.value = "";

  // cross out completed tasks
  const checkBoxes = document.querySelectorAll(".checkbox");

  checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const targetListItem = e.target.parentElement;
      targetListItem.classList.toggle("completed");
      // move completed task to 'completed list'
      const completedList = document.querySelector(".completed-list");
      completedList.appendChild(targetListItem);
    });
  });
  // =================================some work necessary still: the item should return to the list when unchecked.

  // edit item in list
  const editBtns = document.querySelectorAll(".edit");
  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const toDoInput = document.querySelector(".to-do-input");
      const targetListItem = e.target.parentElement;
      let targetContent = targetListItem.textContent.trim();

      inputElement.value = targetContent;
      console.log(toDoInput);
      addItemBtn.textContent = "Save";
      targetListItem.remove();
      // save notification
      notifyChanges();
    });
    hideElement();
    addItemBtn.textContent = "Add";
  });

  // delete item from list
  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetListItem = e.target.parentElement;
      targetListItem.remove();
      // delete notification
      const saveChanges = document.querySelector(".saved-changes");
      saveChanges.textContent = "Your task was successfully deleted";
      hideElement();
    });
  });
}

// save changes notification function
const saveChanges = document.querySelector(".saved-changes");
function notifyChanges() {
  addItemBtn.addEventListener("click", () => {
    saveChanges.textContent = "Your changes have been saved!";
  });
}

function hideElement() {
  setTimeout(() => {
    saveChanges.textContent = "";
  }, 3000);
}

addItemBtn.addEventListener("click", addItem);




// text must wrap when overflowing the row
