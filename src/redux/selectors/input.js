import { createSelector } from 'reselect';

const selectRootState = state => state.input;

export const selectInput = createSelector(
  [selectRootState],
  input => input
);