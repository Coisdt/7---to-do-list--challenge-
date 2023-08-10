const addItemBtn = document.querySelector(".add-btn");
const inputElement = document.querySelector(".to-do-input");
const listContainer = document.querySelector(".list-container");
const toDoList = document.querySelector(".to-do-list");
const appCenter = document.querySelector(".center");

function addTask(e) {
  // create new element
  const task = document.createElement("li");
  task.setAttribute("class", "task-item");
  let inputValue = inputElement.value;

  //   if input is empty
  if (inputElement.value.trim() === "") {
    return;
  }
  //   add tasks to list
  task.innerHTML = `
  <input class='checkbox' type="checkbox"></input>
  <span class='item-value'>${
    inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
  }</span>
  <i class="time-stamp"></i> 
  <i class="edit fa-solid fa-pencil"></i>
  <i class="delete fa-solid fa-trash"></i> 
  `;
  const newTaskAdded = toDoList.appendChild(task);

  // time stamp in each item
  const timeStamp = new Date();
  const date = timeStamp.getDate();
  const month = timeStamp.getMonth();
  const year = timeStamp.getFullYear();
  const timeStampElement = document.querySelectorAll(".time-stamp");
  const fullTimeStamp = `Created: ${date}/${month}/${year}`;

  timeStampElement.forEach((elem) => {
    elem.textContent = fullTimeStamp;
  });

  // show list-container only when new items are added
  if (newTaskAdded) {
    listContainer.classList.add("show-list");
  }

  //   reset input
  inputElement.value = "";

  // show completed-list-container only when items are completed
  appCenter.classList.add("show-list");

  // cross out completed tasks
  const checkBoxes = document.querySelectorAll(".checkbox");

  checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const targetTask = e.target.parentElement;
      targetTask.classList.add("completed");

      // move completed task to 'completed list'
      const completedList = document.querySelector(".completed-list-container");
      const completedItem = completedList.appendChild(targetTask);
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
          completedItem.classList.remove("completed");
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
      const targetTask = e.target.parentElement;
      let targetTaskSpan = targetTask.querySelector(".item-value");

      inputElement.value = targetTaskSpan.textContent;
      addItemBtn.textContent = "Save";
      targetTask.remove();
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
      const targetTask = e.target.parentElement;
      targetTask.remove();
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

addItemBtn.addEventListener("click", addTask);
