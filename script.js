const taskBox = document.querySelector(".input-box");
const taskListCont = document.querySelector(".list-container");

let addTask = () => {
  if (taskBox.value === "") {
    alert("You must Write Something");
  } else {
    let tasks = document.createElement("li");
    tasks.innerHTML = taskBox.value;
    taskListCont.appendChild(tasks);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    tasks.appendChild(span);
  }
  taskBox.value = "";
};

taskListCont.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

let saveData = () => {
  localStorage.setItem("data", taskListCont.innerHTML);
};
let showTask = () => {
  taskListCont.innerHTML = localStorage.getItem("data");
};
showTask();
