import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TodoFooter from './TodoFooter';
import { FilterOptions } from '@/types';

describe('TodoFooter', () => {
  const mockClearCompleted = vi.fn();
  const mockFilterActive = vi.fn().mockImplementation((filterValue: FilterOptions) => {
    console.log(filterValue);
  });
  it('should display the amount of todos', () => {
    render(
      <TodoFooter
        numTodos={5}
        onFilter={mockFilterActive}
        onClearCompleted={mockClearCompleted}
      />
    );
    expect(screen.getByText('5 items left')).toBeInTheDocument();
  });

  it('should call onFilter with Active', async () => {
    const mockFilterActive = vi.fn().mockImplementation((filterValue: FilterOptions) => {
      console.log(filterValue);
    });
    render(
      <TodoFooter
        numTodos={5}
        onFilter={mockFilterActive}
        onClearCompleted={mockClearCompleted}
      />
    );
    const filterActiveBtn = screen.getByText('Active');

    await act(async () => {
      fireEvent.click(filterActiveBtn);
    });

    await waitFor(() => {
      expect(mockFilterActive).toHaveBeenCalledWith(FilterOptions.Active);
    });
  });

  it('should call onFilter with All', async () => {
    const mockFilterAll = vi.fn().mockImplementation((filterValue: FilterOptions) => {
      console.log(filterValue);
    });
    render(
      <TodoFooter
        numTodos={5}
        onFilter={mockFilterAll}
        onClearCompleted={mockClearCompleted}
      />
    );
    const filterAll = screen.getByText('All');

    await act(async () => {
      fireEvent.click(filterAll);
    });

    await waitFor(() => {
      expect(mockFilterAll).toHaveBeenCalledWith(FilterOptions.All);
    });
  });
  it('should call onFilter with Completed', async () => {
    const mockFilterAll = vi.fn().mockImplementation((filterValue: FilterOptions) => {
      console.log(filterValue);
    });
    render(
      <TodoFooter
        numTodos={5}
        onFilter={mockFilterAll}
        onClearCompleted={mockClearCompleted}
      />
    );
    const filterAll = screen.getByText('Completed');

    await act(async () => {
      fireEvent.click(filterAll);
    });

    await waitFor(() => {
      expect(mockFilterAll).toHaveBeenCalledWith(FilterOptions.Completed);
    });
  });

  it('should call onClearCompleted ', async () => {
    const mockFilterAll = vi.fn();
    render(
      <TodoFooter
        numTodos={5}
        onFilter={mockFilterAll}
        onClearCompleted={mockClearCompleted}
      />
    );
    const filterClearCompleted = screen.getByText('Clear Completed');

    await act(async () => {
      fireEvent.click(filterClearCompleted);
    });

    await waitFor(() => {
      expect(mockClearCompleted).toHaveBeenCalled();
    });
  });
});
