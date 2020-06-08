import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTodos, 
  insertTodo, 
  deleteTodo as removeTodo, 
  toggleTodo as changeTodo, 
  dragTodo as draggingTodo,
  editTodo as updateTodo,
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
      },
    }));
    setTitle('');
    setText('');
    setDate('');
  };

  const deleteTodo = (key, id) => dispatch(removeTodo({ key, id, }));

  const toggleTodo = (key, id) => dispatch(changeTodo({ key, id, }));

  const dragTodo = (key, todos) => dispatch(draggingTodo({ key, todos, }));

  const editTodo = (key, id, todo) =>
    dispatch(updateTodo({
      key, id, todo
    }));

  return {
    todos,
    getTodos,
    putTodo,
    deleteTodo,
    toggleTodo,
    dragTodo,
    editTodo, 
  };
};

export default useTodo;
