import { TodoType } from '@/types';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Todo from './Todo';
import todoService from './todoService';

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
    todo: 'go to the gym',
    userId: 1,
    completed: false,
  },
  {
    id: 4,
    todo: 'learn web development today',
    userId: 1,
    completed: true,
  },
];

const updatedTodo: TodoType = {
  id: 1,
  todo: 'buy cofee',
  userId: 1,
  completed: true,
};

const newTodo: TodoType = {
  id: 6,
  todo: 'learn-react',
  userId: 1,
  completed: false,
};

const deleteTodo = newTodo;

describe('Todo', () => {
  beforeEach(async () => {
    vi.spyOn(todoService, 'loadTodos').mockResolvedValue(todos);
    vi.spyOn(todoService, 'addTodo').mockResolvedValue(newTodo);
    await act(async () => {
      render(<Todo />);
    });
  });
  it('should load the todos on mount', async () => {
    expect(todoService.loadTodos).toHaveBeenCalled();
  });
  it('should add a todo in the todolist', async () => {
    const inputField = screen.getByTestId('add-todo');
    await act(async () => {
      fireEvent.change(inputField, { target: { value: newTodo.todo } });
      fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter', charCode: 13 });
    });

    await waitFor(() => {
      expect(screen.getByText(newTodo.todo)).toBeInTheDocument();
    });
  });
  it('should clear the add todo input after adding a todo', async () => {
    const inputField = screen.getByTestId('add-todo') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(inputField, { target: { value: newTodo.todo } });
      fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter', charCode: 13 });
    });

    await waitFor(() => {
      expect(inputField.value).toBe('');
    });
  });
  it('should delete a todo', async () => {
    vi.spyOn(todoService, 'deleteTodo').mockResolvedValue(deleteTodo);
    const firstTodo = screen.getByTestId('todo-0');
    const firstTodoDeleteBtn = screen.getByTestId('delete-button-0');

    await act(async () => {
      fireEvent.click(firstTodoDeleteBtn);
    });

    await waitFor(() => {
      expect(firstTodo).not.toBeInTheDocument();
    });
  });
  it('should update a todo', async () => {
    vi.spyOn(todoService, 'updateTodo').mockResolvedValue(updatedTodo);
    const firstTodo = screen.getByTestId('todo-text-0');

    await act(async () => {
      fireEvent.click(firstTodo!);
    });

    await waitFor(async () => {
      expect(firstTodo).toHaveClass('done');
    });
  });

  it('should show only the todos which are active', async () => {
    const activeFilter = screen.getByText('Active');

    await act(async () => {
      fireEvent.click(activeFilter);
    });

    await waitFor(async () => {
      todos
        .filter((todo: TodoType) => !todo.completed)
        .forEach((todo: TodoType) => {
          expect(screen.getByTestId('mainList')).toHaveTextContent(todo.todo);
        });
    });
  });

  it('should show only the todos which are completed', async () => {
    const activeFilter = screen.getByText('Active');

    await act(async () => {
      fireEvent.click(activeFilter);
    });

    const completedFilter = screen.getByText('Completed');

    await act(async () => {
      fireEvent.click(completedFilter);
    });

    await waitFor(async () => {
      todos
        .filter((todo: TodoType) => todo.completed)
        .forEach((todo: TodoType) => {
          expect(screen.getByTestId('mainList')).toHaveTextContent(todo.todo);
        });
    });
  });

  it('should show all the todos', async () => {
    const activeFilter = screen.getByText('Active');

    await act(async () => {
      fireEvent.click(activeFilter);
    });

    const allFilter = screen.getByText('All');
    await act(async () => {
      fireEvent.click(allFilter);
    });

    await waitFor(async () => {
      todos.forEach((todo: TodoType) => {
        expect(screen.getByTestId('mainList')).toHaveTextContent(todo.todo);
      });
    });
  });

  it('should clear all the completed todos', async () => {
    const activeFilter = screen.getByTestId('clear-completed-todos');

    await act(async () => {
      fireEvent.click(activeFilter);
    });

    await waitFor(async () => {
      todos.forEach((todo: TodoType) => {
        if (todo.completed) expect(screen.getByTestId('mainList')).not.toHaveTextContent(todo.todo);
        else expect(screen.getByTestId('mainList')).toHaveTextContent(todo.todo);
      });
    });
  });
});
