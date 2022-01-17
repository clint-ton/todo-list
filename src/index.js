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

const DOMHandler = (() => {})();

const testTask = taskFactory("Go to the gym");
console.log(testTask.getDescription());
testTask.setDescription("Do some programming");
console.log(testTask.getDescription());
