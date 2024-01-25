import { TodoType } from '@/types';
import TodoFooterButton from './TodoFooterButton';
import { TodoListItem } from './TodoListItem';
import IconChecked from '@/svg/IconChecked';
import IconUnChecked from '@/svg/IconUnchecked';
import { TodoListItemWrapper } from './TodoListItemWrapper';

type TodoProps = {
  todos: TodoType[];
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
  onClearCompleted: () => void;
  isDarkMode: boolean;
};

export default function TodoList({ todos, onDelete, onUpdate, onClearCompleted, isDarkMode }: TodoProps) {
  return (
    <ul
      className='flex flex-col boxShadow w-full bg-todoListBackground dark:bg-darkTodoListBackground rounded-md '
      data-testid='mainList'
    >
      {todos.map((todo, index) => (
        <TodoListItem
          todo={todo}
          index={index}
          onDelete={onDelete}
          onUpdate={onUpdate}
          key={todo.id}
        >
          {todo.completed ? (
            <IconChecked
              testId={`todo-checked-${index}`}
              className={'shrink-0'}
            />
          ) : (
            <IconUnChecked
              iconValues={{
                fillColor: isDarkMode ? 'dark:bg-green-600' : 'bg-white',
                stroke: isDarkMode ? '#393A4B' : '#E3E4F1',
              }}
              testId={`todo-unchecked-${index}`}
              className={'shrink-0'}
            />
          )}
        </TodoListItem>
      ))}
      <TodoListItemWrapper className='sm:hidden flex justify-between align-middle'>
        <p>{todos.length} items left</p>
        <TodoFooterButton
          onClickHandler={onClearCompleted}
          isActive={false}
          testId='clear-completed-todos-mobile'
          text='Clear Completed'
        />
      </TodoListItemWrapper>
    </ul>
  );
}
