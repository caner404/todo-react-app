import { TodoType } from '@/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TodoList from './TodoList';
import userEvent from '@testing-library/user-event';

describe('TodoList', () => {
  const todos: TodoType[] = [
    {
      id: 1,
      todo: 'buy cofee',
      userId: 1,
      completed: false,
    },
    {
      id: 2,
      todo: 'take out the trash',
      userId: 1,
      completed: false,
    },
    {
      id: 3,
      todo: 'clean the dishes',
      userId: 1,
      completed: true,
    },
  ];
  const mockUpdateTodo = vi.fn();
  const mockDeleteTodo = vi.fn();
  const mockOnClearCompleted = vi.fn();
  beforeEach(() => {
    render(
      <TodoList
        todos={todos}
        onDelete={mockDeleteTodo}
        onUpdate={mockUpdateTodo}
        isDarkMode={false}
        onClearCompleted={mockOnClearCompleted}
        updateTodoOrder={mockUpdateTodo}
      />
    );
  });

  it('should display the todos', () => {
    expect(screen.getByText(todos[0].todo)).toBeInTheDocument();
    expect(screen.getByText(todos[1].todo)).toBeInTheDocument();
  });
  describe('when a todo is clicked', () => {
    it('should call the onUpdate Handler', async () => {
      await userEvent.click(screen.getByText(todos[0].todo));

      expect(mockUpdateTodo).toHaveBeenCalled();
    });
  });
  describe('when a todo will be deleted', () => {
    it('should call the onDelete Handler', async () => {
      const deleteBtn = screen.getByTestId('delete-button-0');
      await userEvent.click(deleteBtn);
      expect(mockDeleteTodo).toHaveBeenCalled();
    });
  });
  it('should display checked Mark when todo is completed', () => {
    expect(screen.getByTestId('todo-checked-2')).toBeInTheDocument();
  });
  it('should display unchecked Mark when todo is not completed', () => {
    expect(screen.getByTestId('todo-unchecked-0')).toBeInTheDocument();
    expect(screen.getByTestId('todo-unchecked-1')).toBeInTheDocument();
  });
});
