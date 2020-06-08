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
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILURE,
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
  const { id } = action.payload;
  return {
    ...state,
    todos: [
      ...state.todos.filter(todo => todo.id !== id),
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
  const { id } = action.payload;
  return {
    ...state,
    todos: [
      ...state.todos.map(todo => ({
        ...todo,
        done: todo.id === id ? !todo.done : todo.done,
      }))
    ]
  }
};
const failureToggleTodo = (state, action) => ({
  ...state,
  status: 'error',
  exception: action.payload,
});

// todo item 드래그
const requestDragTodo = state => ({
  ...state,
  status: 'request',
});
const successDragTodo = (state, action) => {
  const { payload: { todos }, } = action;
  return {
    ...state,
    todos: todos,
    status: 'success',
  }
};
const failureDragTodo = (state, action) => ({
  ...state,
  status: 'error',
  exception: action.payload,
});

// todo item 수정
const requestEditTodo = state => ({
  ...state,
  status: 'request',
});
const successEditTodo = (state, action) => {
  const { payload: { id, todo: { title, text, date, }, }, } = action;
  return {
    ...state,
    todos: [
      ...state.todos.map(todo => ({
        ...todo,
        title: todo.id === id ? title : todo.title,
        text: todo.id === id ? text : todo.text,
        date: todo.id === id ? date : todo.date,
      }))
    ],
    status: 'success',
  }
};
const failureEditTodo = (state, action) => ({
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
    [EDIT_TODO_REQUEST]: requestEditTodo,
    [EDIT_TODO_SUCCESS]: successEditTodo,
    [EDIT_TODO_FAILURE]: failureEditTodo,
  },
  initialState
);
