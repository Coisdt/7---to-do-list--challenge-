const addItemBtn = document.querySelector(".add-btn");
const inputElement = document.querySelector(".to-do-input");
const listContainer = document.querySelector(".list-container");
const toDoList = document.querySelector(".to-do-list");
const appCenter = document.querySelector(".center");

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
  const newTaskAdded = toDoList.appendChild(listItem);

  // show list-container only when new items are added
  if (newTaskAdded) {
    listContainer.classList.add("show-list");
  }

  //   reset input
  inputElement.value = "";

  // when enter is pressed, it activates the add btn

  // show completed-list-container only when items are completed
  addItemBtn.addEventListener("click", () => {
    appCenter.classList.add("show-list");
  });

  // cross out completed tasks
  const checkBoxes = document.querySelectorAll(".checkbox");

  checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const targetListItem = e.target.parentElement;
      targetListItem.classList.toggle("completed");
      // move completed task to 'completed list'
      const completedList = document.querySelector(".completed-list");
      const completedItem = completedList.appendChild(targetListItem);
      const completedListContainer = document.querySelector(
        ".completed-list-container"
      );

      // only show completed-list-container on task add
      if (completedItem) {
        completedListContainer.classList.add("show-list");
      }
      // move completed task back to ToDoList
      completedItem.addEventListener("click", () => {
        checkbox.addEventListener("click", () => {
          toDoList.appendChild(completedItem);
          // =================================bug - when completed item is returned to list and then clicked again, it does nothing
        });
      });
    });
  });

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
      const notification = document.querySelector(".notification");
      notification.textContent = "Task successfully deleted.";
      hideElement();
    });
  });
}

// save changes notification function
const notification = document.querySelector(".notification");
function notifyChanges() {
  addItemBtn.addEventListener("click", () => {
    notification.textContent = "Changes saved!";
  });
}

// remove notification message after a few seconds
function hideElement() {
  setTimeout(() => {
    notification.textContent = "";
  }, 3000);
}

addItemBtn.addEventListener("click", addItem);
