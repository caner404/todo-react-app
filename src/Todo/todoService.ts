import { TodoType } from '@/types';

const BaseUrl = 'https://dummyjson.com/todos';

const todoService = {
  loadTodos: async function () {
    try {
      const response = await fetch(`${BaseUrl}?limit=5`);
      const data = await response.json();
      const todos = data.todos as TodoType[];
      return todos;
    } catch (error) {
      console.error(error);
    }
  },
  addTodo: async function (todo: string) {
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: todo,
          completed: false,
          userId: 5,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  deleteTodo: async function (id: number): Promise<TodoType> {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    });
    const deletedTodo = await response.json();
    return deletedTodo;
  },
  updateTodo: async function (updateTodo: TodoType): Promise<TodoType> {
    const response = await fetch(`https://dummyjson.com/todos/${updateTodo.id}`, {
      method: 'PUT' /* or PATCH */,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: !updateTodo.completed,
      }),
    });
    const updatedTodo = await response.json();
    return updatedTodo;
  },
  deleteTodos: async function (todos: TodoType[]) {
    todos.forEach(async (todo) => {
      await fetch(`https://dummyjson.com/todos/${todo.id}`, {
        method: 'DELETE',
      });
    });
  },
};

export default todoService;
