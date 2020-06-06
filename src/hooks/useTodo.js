import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTodos, 
  insertTodo, 
  deleteTodo as removeTodo, 
  toggleTodo as changeTodo, 
  dragTodo as draggingTodo,
} from '../redux/actions/todo';
import { selectTodo } from '../redux/selectors/todo';
import { getMaxVal } from '../utils';
import useInput from './useInput';

const useTodo = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector(selectTodo);
  const {
    setTitle, setText, setDate
  } = useInput();
  // get todo list
  const getTodos = useCallback(
    (key) => 
      dispatch(
        fetchTodos(key), 
        [dispatch]
      ),
    [dispatch]
  );

  const putTodo = (key, data) => {
    dispatch(insertTodo({
      key,
      todo: {
        id: getMaxVal(todos) || 0,
        ...data,
        done: false,
        chosen: false,
        selected: false,
      },
    }));
    setTitle('');
    setText('');
    setDate('');
  };

  const deleteTodo = (key, id) => {
    dispatch(removeTodo({
      key,
      id,
    }));
  };

  const toggleTodo = (key, id) => {
    dispatch(changeTodo({
      key,
      id,
    }));
  };

  const dragTodo = (key, todos) => {
    dispatch(draggingTodo({
      key,
      todos,
    }));
  };

  return {
    todos,
    getTodos,
    putTodo,
    deleteTodo,
    toggleTodo,
    dragTodo,
  };
};

export default useTodo;
