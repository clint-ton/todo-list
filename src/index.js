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

  // TODO: split out DOMHandler call?
  const addTask = (description) => {
    const newTask = taskFactory(description);
    tasks.push(newTask);
    return newTask;
  };

  return {
    getName,
    getTasks,
    addTask,
  };
};

const DOMHandler = (() => {
  const createTaskItem = (task, parent) => {
    const container = document.createElement("div");
    container.classList.add("task");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", task.toggleCompleted);
    const description = document.createElement("span");
    description.textContent = task.getDescription();

    container.appendChild(checkbox);
    container.appendChild(description);
    return container;
  };

  const renderList = (taskList) => {
    const contentDiv = document.getElementById("content");
    const container = document.createElement("div");
    container.id = taskList.getName();
    contentDiv.appendChild(container);
    for (let i = 0; i < taskList.getTasks().length; i++) {
      container.appendChild(createTaskItem(taskList.getTasks()[i]));
    }
    createEntryBox(taskList);
  };

  const createEntryBox = (parent) => {
    const parentDOMObject = document.getElementById(parent.getName());
    const container = document.createElement("div");
    container.classList.add("entryBox");

    const input = document.createElement("input");
    const button = document.createElement("button");
    button.classList.add("submit");

    input.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        parentDOMObject.insertBefore(
          createTaskItem(parent.addTask(input.value)),
          container
        );
        input.value = "";
      }
    });

    button.addEventListener("click", () => {
      parentDOMObject.insertBefore(
        createTaskItem(parent.addTask(input.value)),
        container
      );
      input.value = "";
    });

    container.appendChild(input);
    container.appendChild(button);
    parentDOMObject.appendChild(container);
  };

  return {
    createTaskItem,
    createEntryBox,
    renderList,
  };
})();

const Application = (() => {
  const lists = {};

  const addList = (name) => {
    if (name in lists) {
      console.log("name in use");
      return;
    }

    lists[name] = taskListFactory(name);
  };

  const getLists = () => lists;

  return {
    addList,
    getLists,
  };
})();

Application.addList("mainTasks");

const mainTasks = Application.getLists()["mainTasks"];

mainTasks.addTask("Go to the Gym");
mainTasks.addTask("Do Programming");
mainTasks.addTask("Jump Rope");
mainTasks.addTask("Play Games");

DOMHandler.renderList(mainTasks);
