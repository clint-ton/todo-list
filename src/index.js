import "./styles.css";

const taskFactory = (description) => {
  let completed = false;

  // Description Functions
  const getDescription = () => {
    return description;
  };
  const setDescription = (newVal) => {
    description = newVal;
  };

  // Completion Functions
  const isCompleted = () => {
    return completed;
  };
  const toggleCompleted = () => {
    completed = !completed;
    console.log(isCompleted());
  };

  return {
    getDescription,
    setDescription,
    isCompleted,
    toggleCompleted,
  };
};

const taskListFactory = (name) => {
  const tasks = [];

  const getName = () => {
    return name;
  };

  const getTasks = () => {
    return tasks;
  };

  const addTask = (description) => {
    const newTask = taskFactory(description);
    tasks.push(newTask);
    DOMHandler.createTaskItem(newTask);
  };

  return {
    getName,
    getTasks,
    addTask,
  };
};

const DOMHandler = (() => {
  const createTaskItem = (task) => {
    const container = document.createElement("div");
    container.classList.add("task");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", task.toggleCompleted);
    const description = document.createElement("span");
    description.textContent = task.getDescription();

    container.appendChild(checkbox);
    container.appendChild(description);

    const content = document.querySelector("#content");

    content.appendChild(container);
  };

  const createEntryBox = () => {
    const container = document.createElement("div");
    container.classList.add("entryBox");

    const input = document.createElement("input");
    const button = document.createElement("button");
    button.classList.add("submit");

    input.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        addTask(input.value);
        input.value = "";
      }
    });

    button.addEventListener("click", () => {
      addTask(input.value);
      input.value = "";
    });

    container.appendChild(input);
    container.appendChild(button);

    const content = document.querySelector("#content");
    content.appendChild(container);
  };

  return {
    createTaskItem,
    createEntryBox,
  };
})();

const mainTasks = taskListFactory("main");
