import { ref, reactive, computed } from "vue";

function useTodoList() {
  let id = 4;

  let newTodo = ref("");

  let todos = reactive([
    { id: 1, title: "任务一", completed: false },
    { id: 2, title: "任务二", completed: true },
    { id: 3, title: "任务三", completed: false },
  ]);

  let allDone = computed({
    get() {
      return todos.every((todo) => todo.completed);
    },
    set(newVal) {
      todos.forEach((todo) => (todo.completed = newVal));
    },
  });

  let filteredTodos = computed({
    get() {
      console.log("filteredTodos get");
      switch (visibility.value) {
        case "all":
          return todos;
        case "active":
          return todos.filter((todo) => !todo.completed);
        case "completed":
          return todos.filter((todo) => todo.completed);
      }
      return todos;
    },
    set(newVal) {
      console.log("filteredTodos set", newVal);
    },
  });

  const addNewTodo = function() {
    todos.unshift({
      id: id++,
      title: newTodo.value,
      completed: false,
    });

    newTodo.value = "";
  };

  let visibility = ref("all");

  const changeVisibility = function(type) {
    console.log(type);
    visibility.value = type;
  };

  return {
    todos,
    allDone,

    filteredTodos,

    newTodo,
    addNewTodo,

    visibility,
    changeVisibility,
  };
}

export default useTodoList;
