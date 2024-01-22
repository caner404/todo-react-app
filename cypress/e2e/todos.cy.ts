import { TodoType } from '../../src/types';
describe('Todos', () => {
  const todo: TodoType = {
    id: 100,
    todo: 'learn more about cypress!',
    completed: false,
    userId: 1,
  };
  let todos: TodoType[] = [];

  beforeEach(() => {
    cy.visit(' http://localhost:5173/');
    cy.intercept('GET', 'https://dummyjson.com/todos?limit=5').as('loadTodos');
    cy.wait('@loadTodos').then((interception) => {
      console.log(interception);
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.todos).to.have.lengthOf(5);
      todos = interception.response.body.todos;
    });
  });
  it('should list the first 5 items from todo API', () => {
    todos.forEach((todo, index) => {
      cy.get(`[data-testid='todo-text-${index}']`).should('contain.text', todo.todo);
    });
  });
  it('should add a todo', () => {
    cy.get("[data-testid='add-todo']").type(`${todo.todo} {enter}`);
    cy.contains(todo.todo);
  });

  it('should delete todo', () => {
    cy.get("[data-testid='todo-0']").as('firstTodo');
    cy.get("[data-testid='delete-button-0']").realHover();
    cy.get("[data-testid='delete-button-0']").should('be.visible');
    cy.get("[data-testid='delete-button-0']").trigger('click');

    cy.intercept('https://dummyjson.com/todos/*').as('deleteTodo');
    cy.wait('@deleteTodo');
    cy.get("[data-testid^='todo']").each(($el) => {
      cy.wrap($el).should('not.have.text', '@firstTodo');
    });
  });

  it('should update todo', () => {
    cy.get("[data-testid^='todo-text']:not(.done)")
      .eq(0)
      .then(($element) => {
        cy.wrap($element).trigger('click');
        cy.intercept('https://dummyjson.com/todos/*').as('updateRequest');
        cy.wait('@updateRequest');
        cy.wrap($element).should('have.class', 'done');
      });
  });

  it('should show all todos', () => {
    cy.get("[data-testid='show-all-todos']").trigger('click');

    cy.get("[data-testid^='todo']").each(($todo) => {
      cy.wrap($todo.text()).should('exist');
    });
  });

  it('should show all active todos', () => {
    cy.get("[data-testid='show-active-todos']").trigger('click');
    cy.get("[data-testid^='todo'] ").each(($todo) => {
      cy.wrap($todo).should('not.have.class', 'done');
    });
  });

  it('should show all completed todos', () => {
    cy.get("[data-testid='show-completed-todos']").trigger('click');
    cy.get("[data-testid^='todo-text'] ").each(($todo) => {
      cy.wrap($todo).should('have.class', 'done');
    });
  });

  it('should clear(delete) all completed todos', () => {
    cy.get("[data-testid='clear-completed-todos']").trigger('click');
    cy.get("[data-testid^='todo'] ").each(($todo) => {
      cy.wrap($todo).should('not.have.class', 'done');
    });

    cy.get("[data-testid='show-all-todos']").trigger('click');
    cy.get("[data-testid^='todo']").each(($todo) => {
      cy.wrap($todo).should('not.have.class', 'done');
    });
  });
});
