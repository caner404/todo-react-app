import IconUnChecked from '@/svg/IconUnchecked';
import { FilterOptions, TodoType } from '@/types';
import { useEffect, useState } from 'react';
import iconMoon from '../assets/images/icon-moon.svg';
import iconSun from '../assets/images/icon-sun.svg';
import TodoFooter from './TodoFooter';
import TodoList from './TodoList';
import todoService from './todoService';

export default function Todo() {
  const [todos, setTodos] = useState([] as TodoType[]);
  const [todoInput, setTodoInput] = useState('');
  const [filter, setFilter] = useState(FilterOptions.All);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
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
    <div className='flex flex-col w-[540px] z-10 m-6 mt-10 sm:mt-16 gap-4 sm:gap-0'>
      <div className='flex justify-between items-center mb-6 sm:mb-12'>
        <h1 className='text-xl sm:text-5xlb tracking-[16px] font-bold uppercase text-white'>Todo</h1>
        <button onClick={toggleDarkMode}>
          <img src={isDarkMode ? iconSun : iconMoon}></img>
        </button>
      </div>

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
