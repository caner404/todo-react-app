import IconUnChecked from '@/svg/IconUnchecked';
import { FilterOptions, TodoType } from '@/types';
import { useEffect, useState } from 'react';

import TodoFooter from './TodoFooter';
import TodoList from './TodoList';
import todoService from './todoService';

type TodoProps = {
  isDarkMode: boolean;
};

export default function Todo({ isDarkMode }: TodoProps) {
  const [todos, setTodos] = useState([] as TodoType[]);
  const [todoInput, setTodoInput] = useState('');
  const [filter, setFilter] = useState(FilterOptions.All);
  const numTodosLeft = todos.filter((todo) => !todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case FilterOptions.All:
        return todo;
      case FilterOptions.Active:
        return !todo.completed;
      case FilterOptions.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  async function listTodos() {
    const result = (await todoService.loadTodos()) as [];
    setTodos(result);
  }

  async function handleDeleteTodo(id: number) {
    await todoService.deleteTodo(id);
    setTodos((todos: TodoType[]) => todos.filter((todo) => todo.id !== id));
  }

  async function handleCompleteTodo(id: number) {
    const updateTodo = todos.filter((todo) => todo.id === id)[0];
    const updatedTodo = await todoService.updateTodo(updateTodo);
    setTodos((todos: TodoType[]) => todos.map((todo) => (todo.id === id ? { ...updatedTodo } : todo)));
  }

  async function handleClearCompletedTodos() {
    setTodos((todos: TodoType[]) => todos.filter((todo) => !todo.completed));
    await todoService.deleteTodos(todos.filter((todo) => todo.completed));
  }

  function handleFilter(filterValue: FilterOptions) {
    setFilter(filterValue);
  }

  function handleUpdateTodoOrder(newTodos: TodoType[]) {
    setTodos([...newTodos]);
  }

  useEffect(() => {
    const bodyElement = document.body;
    if (isDarkMode) {
      bodyElement.classList.add('dark');
    } else {
      bodyElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    listTodos();
  }, []);

  useEffect(
    function () {
      async function callBack(e: KeyboardEvent) {
        if (e.code === 'Enter') {
          const newTodo: TodoType = await todoService.addTodo(todoInput);
          setTodos((todos: TodoType[]) => [...todos, newTodo]);
          setTodoInput('');
        }
      }
      document.addEventListener('keydown', callBack);
      return () => document.removeEventListener('keydown', callBack);
    },
    [todoInput]
  );

  return (
    <div className='flex flex-col gap-4 md:gap-0'>
      <div className='flex align-middle sm:mb-6 gap-3 sm:gap-6 p-4 sm:p-6 bg-todoListBackground dark:bg-darkTodoListBackground rounded-md'>
        <IconUnChecked
          iconValues={{
            fillColor: isDarkMode ? 'dark:bg-green-600' : 'bg-white',
            stroke: isDarkMode ? '#393A4B' : '#E3E4F1',
          }}
        />
        <input
          type='text'
          className='focus:outline-none bg-todoListBackground dark:bg-darkTodoListBackground text-todoListTextColor dark:text-darkTodoListTextColor'
          placeholder='Create a new todo...'
          data-testid='add-todo'
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </div>

      <TodoList
        todos={filteredTodos}
        onDelete={handleDeleteTodo}
        onUpdate={handleCompleteTodo}
        onClearCompleted={handleClearCompletedTodos}
        updateTodoOrder={handleUpdateTodoOrder}
        isDarkMode={isDarkMode}
      />
      <TodoFooter
        numTodos={numTodosLeft}
        filterValue={filter}
        onFilter={handleFilter}
        onClearCompleted={handleClearCompletedTodos}
      />
    </div>
  );
}
