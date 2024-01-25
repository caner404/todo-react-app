import { PropsWithChildren } from 'react';

export type TodoListItemWrapperProps = {
  className?: string;
  dataTestid?: string;
};

export function TodoListItemWrapper(props: PropsWithChildren<TodoListItemWrapperProps>) {
  return (
    <li
      data-testid={props.dataTestid}
      className={`${props.className} p-5 sm:p-6 border-b-2 dark:text-gray-500 text-gray-700 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md`}
    >
      {props.children}
    </li>
  );
}
