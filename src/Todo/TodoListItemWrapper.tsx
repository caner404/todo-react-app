import { PropsWithChildren } from 'react';

export type TodoListItemWrapperProps = {
  className?: string;
  dataTestid?: string;
};

export function TodoListItemWrapper(props: PropsWithChildren<TodoListItemWrapperProps>) {
  return (
    <div
      data-testid={props.dataTestid}
      className={`${props.className} p-5 sm:p-6 border-b-2 border-gray-200 dark:border-slate-700 bg-todoListBackground dark:bg-darkTodoListBackground rounded-md`}
    >
      {props.children}
    </div>
  );
}
