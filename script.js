const taskBox = document.getElementById("input-box");
const taskListCont = document.getElementById("list-container");

let addTask = () => {
  if (taskBox.value === "") {
    alert("You must Write Something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = taskBox.value;
    taskListCont.appendChild(li);
  }
};
