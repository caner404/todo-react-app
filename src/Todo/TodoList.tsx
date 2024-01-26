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
  updateTodoOrder: (todos: TodoType[]) => void;
};

export default function TodoList({
  todos,
  onDelete,
  onUpdate,
  onClearCompleted,
  updateTodoOrder,
  isDarkMode,
}: TodoProps) {
  function handleOnDrag(e: React.DragEvent, todoId: number) {
    e.dataTransfer.setData('todoItem', JSON.stringify(todoId));
  }
  function handleOnDrop(e: React.DragEvent, dropId: number) {
    e.preventDefault();
    const newTodos = todos.slice();
    const draggedId = JSON.parse(e.dataTransfer.getData('todoItem')) as number;
    const draggedTodo = newTodos.filter((todo) => todo.id === draggedId)[0];
    const dropIndex = newTodos.findIndex((todo) => todo.id === dropId);

    newTodos.splice(newTodos.indexOf(draggedTodo), 1);
    newTodos.splice(dropIndex, 0, draggedTodo);
    updateTodoOrder(newTodos);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

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
          onDrag={handleOnDrag}
          onDrop={handleOnDrop}
          onDragOver={handleDragOver}
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
        <p>{todos.filter((todo) => !todo.completed).length} items left</p>
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
