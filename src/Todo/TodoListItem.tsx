import { TodoType } from '@/types';
import iconCross from '@/assets/images/icon-cross.svg';
import { PropsWithChildren } from 'react';
import { TodoListItemWrapper } from './TodoListItemWrapper';

type TodoListItemProps = {
  todo: TodoType;
  index: number;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TodoListItem(props: PropsWithChildren<TodoListItemProps>) {
  return (
    <TodoListItemWrapper
      className='group flex align-middle gap-3 sm:gap-6'
      dataTestid={`todo-${props.index}`}
    >
      {props.children}
      <p
        onClick={() => props.onUpdate(props.todo.id)}
        data-testid={`todo-text-${props.index}`}
        className={`self-center text-todoListTextColor dark:text-darkTodoListTextColor  hover:cursor-pointer ${
          props.todo.completed ? 'done' : ''
        }`}
      >
        {props.todo.todo}
      </p>
      <button
        className='ml-auto shrink-0 lg:invisible lg:group-hover:visible '
        data-testid={`delete-button-${props.index}`}
        onClick={() => props.onDelete(props.todo.id)}
      >
        <img src={iconCross} />
      </button>
    </TodoListItemWrapper>
  );
}
