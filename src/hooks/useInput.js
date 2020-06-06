import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setTitle as inputTitle,
  setText as inputText,
  setDate as inputDate,
} from '../redux/actions/input';
import { selectInput } from '../redux/selectors/input';

const useInput = () => {
  const dispatch = useDispatch();

  const setTitle = useCallback(input =>
    dispatch(
      inputTitle(input), [dispatch]
    ), 
    [dispatch]
  );
  const setText = useCallback(input => 
    dispatch(
      inputText(input), [dispatch]
    ), 
    [dispatch]
  );
  const setDate = useCallback(input =>
    dispatch(
      inputDate(input), [dispatch]
    ), 
    [dispatch]
  );

  return {
    input: useSelector(selectInput),
    setTitle,
    setText,
    setDate,
  };
};

export default useInput;
