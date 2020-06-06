import { combineReducers } from 'redux';

import input from './input';
import todo from './todo';

export default combineReducers({
  input,
  todo,
});