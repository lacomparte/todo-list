import { createSelector } from 'reselect';

const selectRootState = state => state.todo;

export const selectTodo = createSelector(
  [selectRootState],
  todo => todo,
);

export const selectTodos = createSelector(
  [selectRootState],
  todo => todo.todos,
)