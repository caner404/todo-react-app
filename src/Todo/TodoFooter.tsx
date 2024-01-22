import { FilterOptions } from '../types';
import TodoFooterButton from './TodoFooterButton';
type TodoFooterProps = {
  numTodos: number;
  filterValue: FilterOptions;
  onFilter: (filterValue: FilterOptions) => void;
  onClearCompleted: () => void;
};

export default function TodoFooter({ numTodos = 0, filterValue, onFilter, onClearCompleted }: TodoFooterProps) {
  return (
    <div className='flex justify-center sm:justify-between  p-4 sm:p-7 rounded bg-white'>
      <p className='hidden sm:block'>{numTodos} items left</p>
      <div className='todo-fitler flex gap-4 '>
        <TodoFooterButton
          onClickHandler={() => onFilter(FilterOptions.All)}
          isActive={filterValue === FilterOptions.All}
          text='All'
          testId='show-all-todos'
        />

        <TodoFooterButton
          onClickHandler={() => onFilter(FilterOptions.Active)}
          isActive={filterValue === FilterOptions.Active}
          text='Active'
          testId='show-active-todos'
        />

        <TodoFooterButton
          onClickHandler={() => onFilter(FilterOptions.Completed)}
          isActive={filterValue === FilterOptions.Completed}
          text='Completed'
          testId='show-completed-todos'
        />
      </div>
      <TodoFooterButton
        onClickHandler={onClearCompleted}
        isActive={false}
        testId='clear-completed-todos'
        text='Clear Completed'
        className='hidden sm:block'
      />
    </div>
  );
}
