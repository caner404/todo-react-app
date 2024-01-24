import IconChecked from '@/svg/IconChecked';
import IconUnChecked from '@/svg/IconUnchecked';
import { TodoType } from '@/types';
import iconCross from '../assets/images/icon-cross.svg';
import TodoFooterButton from './TodoFooterButton';

type TodoProps = {
  todos: TodoType[];
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
  onClearCompleted: () => void;
  isDarkmode: boolean;
};

export default function TodoList({ todos, onDelete, onUpdate, onClearCompleted, isDarkmode }: TodoProps) {
  return (
    <ul
      className='flex flex-col boxShadow w-full bg-white dark:bg-slate-800 rounded-md '
      data-testid='mainList'
    >
      {todos.map((todo, index) => (
        <li
          className='group flex  align-middle gap-3 sm:gap-6 p-5 sm:p-6 border-b-2  border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md'
          key={todo.id}
          data-testid={`todo-${index}`}
        >
          {todo.completed ? (
            <IconChecked
              testId={`todo-checked-${index}`}
              className={'shrink-0'}
            />
          ) : (
            <IconUnChecked
              iconValues={{
                fillColor: isDarkmode ? 'dark:bg-green-600' : 'bg-white',
                stroke: isDarkmode ? '#393A4B' : '#E3E4F1',
              }}
              testId={`todo-unchecked-${index}`}
              className={'shrink-0'}
            />
          )}
          <p
            onClick={() => onUpdate(todo.id)}
            data-testid={`todo-text-${index}`}
            className={`self-center text-gray-700 hover:cursor-pointer ${todo.completed ? 'done' : ''}`}
          >
            {todo.todo}
          </p>
          <button
            className='ml-auto invisible group-hover:visible '
            data-testid={`delete-button-${index}`}
            onClick={() => onDelete(todo.id)}
          >
            <img src={iconCross} />
          </button>
        </li>
      ))}
      <li className='sm:hidden flex justify-between align-middle p-5 sm:p-6 border-b-2  border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md'>
        <p>{todos.length} items left</p>
        <TodoFooterButton
          onClickHandler={onClearCompleted}
          isActive={false}
          testId='clear-completed-todos-mobile'
          text='Clear Completed'
        />
      </li>
    </ul>
  );
}
