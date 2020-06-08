import { createAction } from 'redux-actions';
import {
  FETCH_TODOS,
  INSERT_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  DRAG_TODO,
  EDIT_TODO,
} from './ActionTypes';

export const fetchTodos = createAction(FETCH_TODOS);
export const insertTodo = createAction(INSERT_TODO);
export const toggleTodo = createAction(TOGGLE_TODO);
export const deleteTodo = createAction(DELETE_TODO);
export const dragTodo = createAction(DRAG_TODO);
export const editTodo = createAction(EDIT_TODO);