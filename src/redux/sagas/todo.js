import { put, fork, all, takeLatest, call, select } from 'redux-saga/effects';
import { get, set } from '../../redux/sagas/service/api';
import * as ActionTypes from '../actions/ActionTypes';

const getTodos = async (key) => await get(key);
const setTodos = async ({key, value}) => await set(key, value);

// search todo list
function* fetchTodosSaga() {
  yield takeLatest(ActionTypes.FETCH_TODOS, fetchTodos);
}
function* fetchTodos(action) {
  const { payload } = action;
  yield put({
    type: ActionTypes.TODOS_REQUEST,
  });
  try {
    yield put({
      type: ActionTypes.TODOS_SUCCESS,
      payload: yield call(getTodos, payload) || [],
    });
  } catch (e) {
    yield put({
      type: ActionTypes.TODOS_FAILURE,
      payload: e,
    });
  }
}

// insert todo
function* insertTodoSaga() {
  yield takeLatest(ActionTypes.INSERT_TODO, putTodos);
}
function* putTodos(action) {
  const { payload: { key, todo }, } = action;
  yield put({
    type: ActionTypes.INSERT_TODO_REQUEST,
  });
  try {
    yield put({
      type: ActionTypes.INSERT_TODO_SUCCESS,
      payload: {
        todo,
      },
    });
    const { todo: { todos }, } = yield select();
    yield call(setTodos, {
      key,
      value: todos,
    });
    // 등록 성공 후 필드 초기화
  } catch (e) {
    yield put({
      type: ActionTypes.INSERT_TODO_FAILURE,
      payload: e,
    });
  }
}

// delete todo
function* deleteTodoSaga() {
  yield takeLatest(ActionTypes.DELETE_TODO, removeTodo);
}
function* removeTodo(action) {
  const { payload: { key, id }, } = action;
  yield put({
    type: ActionTypes.DELETE_TODO_REQUEST,
  });
  try {
    yield put({
      type: ActionTypes.DELETE_TODO_SUCCESS,
      payload: {
        id,
      }
    });
    const { todo: { todos }, } = yield select();
    yield call(setTodos, {
      key,
      value: todos,
    });
  } catch (e) {
    yield put({
      type: ActionTypes.DELETE_TODO_FAILURE,
      payload: e,
    });
  }
}

// toggle todo
function* toggleTodoSaga() {
  yield takeLatest(ActionTypes.TOGGLE_TODO, toggleTodo);
}
function* toggleTodo(action) {
  const { payload: { key, id }, } = action;
  yield put({
    type: ActionTypes.TOGGLE_TODO_REQUEST,
  });
  try {
    yield put({
      type: ActionTypes.TOGGLE_TODO_SUCCESS,
      payload: {
        id,
      }
    });
    const { todo: { todos }, } = yield select();
    yield call(setTodos, {
      key,
      value: todos,
    });
  } catch (e) {
    yield put({
      type: ActionTypes.TOGGLE_TODO_FAILURE,
      paylaod: e,
    });
  }
}

// drag todo
function* dragTodoSaga() {
  yield takeLatest(ActionTypes.DRAG_TODO, dragTodo);
}
function* dragTodo(action) {
  const { payload: { key, todos }, } = action;
  yield put({
    type: ActionTypes.DRAG_TODO_REQUEST,
  });
  try {
    yield put({
      type: ActionTypes.DRAG_TODO_SUCCESS,
      payload: {
        todos,
      },
    });
    yield call(setTodos, {
      key,
      value: todos,
    });
  } catch (e) {
    yield put({
      type: ActionTypes.DRAG_TODO_FAILURE,
      payload: e,
    })
  }
}

// edit todo
function* editTodoSaga() {
  yield takeLatest(ActionTypes.EDIT_TODO, editTodo);
}
function* editTodo(action) {
  const { payload: { key, id, todo }, } = action;
  yield put({
    type: ActionTypes.EDIT_TODO_REQUEST,
  });
  try {
    yield put({
      type: ActionTypes.EDIT_TODO_SUCCESS,
      payload: {
        id,
        todo,
      },
    });
    const { todo: { todos }, } = yield select();
    yield call(setTodos, {
      key,
      value: todos,
    });
  } catch (e) {
    yield put({
      type: ActionTypes.EDIT_TODO_FAILURE,
      payload: e,
    })
  }
}

export function* todoSaga() {
  yield all([
    fork(fetchTodosSaga),
    fork(insertTodoSaga),
    fork(deleteTodoSaga),
    fork(toggleTodoSaga),
    fork(dragTodoSaga),
    fork(editTodoSaga),
  ]);
}