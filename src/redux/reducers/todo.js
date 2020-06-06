import { handleActions } from 'redux-actions';
import {
  TODOS_REQUEST,
  TODOS_SUCCESS,
  TODOS_FAILURE,
  INSERT_TODO_REQUEST,
  INSERT_TODO_SUCCESS,
  INSERT_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_SUCCESS,
  TOGGLE_TODO_FAILURE,
  DRAG_TODO_REQUEST,
  DRAG_TODO_SUCCESS,
  DRAG_TODO_FAILURE,
} from '../actions/ActionTypes';

const initialState = {
  todos: [],
  status: '',
  exception: null,
};

// todo list 조회
const requestTodos = state => ({
  ...state,
  status: 'fetching',
})
const successTodos = (state, action) => ({
  ...state,
  todos: [...action.payload],
  status: 'success',
});
const failureTodos = (state, action) => ({
  ...state,
  status: 'error',
  exception: action.payload,
});

// todo item 등록
const requsetInsertTodo = state => ({
  ...state,
  status: 'fetching',
});
const successInsertTodo = (state, action) => {
  const { todo } = action.payload;
  return {
    ...state,
    todos: [
      ...state.todos, todo
    ],
    status: 'success',
  }
};
const failureInsertTodo = (state, action) => ({
  ...state,
  statue: 'error',
  exception: action.payload,
});

// tood item 삭제
const requestDeleteTodo = state => ({
  ...state,
  statue: 'fetching',
});
const successDeleteTodo = (state, action) => {
  const { idx } = action.payload;
  return {
    ...state,
    todos: [
      ...state.todos.slice(0, idx),
      ...state.todos.slice(idx + 1, state.todos.length),
    ],
    status: 'success',
  }
};
const failureDeleteTodo = (state, action) => ({
  ...state,
  statue: 'error',
  exception: action.payload,
});

// tood item 토글
const requestToggleTodo = state => ({
  ...state,
  status: 'request',
});
const successToggleTodo = (state, action) => {
  const { idx } = action.payload;
  return {
    ...state,
    todos: [
      ...state.todos.slice(0, idx),
      {
        ...state.todos[idx],
        done: !state.todos[idx].done,
      },
      ...state.todos.slice(idx + 1, state.todos.length),
    ]
  }
};
const failureToggleTodo = (state, action) => ({
  ...state,
  status: 'error',
  exception: action.payload,
});

const requestDragTodo = state => ({
  ...state,
  status: 'request',
})
const successDragTodo = (state, action) => {
  const { payload: { todos }, } = action;
  return {
    ...state,
    todos: todos,
    status: 'success',
  }
}
const failureDragTodo = (state, action) => ({
  ...state,
  status: 'error',
  exception: action.payload,
})

export default handleActions(
  {
    [TODOS_REQUEST]: requestTodos,
    [TODOS_SUCCESS]: successTodos,
    [TODOS_FAILURE]: failureTodos,
    [INSERT_TODO_REQUEST]: requsetInsertTodo,
    [INSERT_TODO_SUCCESS]: successInsertTodo,
    [INSERT_TODO_FAILURE]: failureInsertTodo,
    [DELETE_TODO_REQUEST]: requestDeleteTodo,
    [DELETE_TODO_SUCCESS]: successDeleteTodo,
    [DELETE_TODO_FAILURE]: failureDeleteTodo,
    [TOGGLE_TODO_REQUEST]: requestToggleTodo,
    [TOGGLE_TODO_SUCCESS]: successToggleTodo,
    [TOGGLE_TODO_FAILURE]: failureToggleTodo,
    [DRAG_TODO_REQUEST]: requestDragTodo,
    [DRAG_TODO_SUCCESS]: successDragTodo,
    [DRAG_TODO_FAILURE]: failureDragTodo,
  },
  initialState
);
