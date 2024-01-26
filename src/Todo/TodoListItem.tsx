import { TodoType } from '@/types';
import iconCross from '@/assets/images/icon-cross.svg';
import React, { PropsWithChildren } from 'react';
import { TodoListItemWrapper } from './TodoListItemWrapper';

type TodoListItemProps = {
  todo: TodoType;
  index: number;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
  onDrag: (e: React.DragEvent, todoId: number) => void;
  onDrop: (e: React.DragEvent, todoId: number) => void;
  onDragOver: (e: React.DragEvent) => void;
};

export function TodoListItem(props: PropsWithChildren<TodoListItemProps>) {
  return (
    <TodoListItemWrapper dataTestid={`todo-${props.index}`}>
      <li
        className='group flex align-middle gap-3 sm:gap-6'
        draggable
        onDragStart={(e) => props.onDrag(e, props.todo.id)}
        onDragOver={props.onDragOver}
        onDrop={(e) => props.onDrop(e, props.todo.id)}
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
          aria-label='delete a todo'
        >
          <img src={iconCross} />
        </button>
      </li>
    </TodoListItemWrapper>
  );
}
