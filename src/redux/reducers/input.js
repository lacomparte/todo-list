import { handleActions } from 'redux-actions';
import {
  SET_TITLE,
  SET_TEXT,
  SET_DATE,
} from '../actions/ActionTypes';

const initialState = {
  title: '',
  text: '',
  date: '',
};

const setTitle = (state, action) => ({
  ...state,
  title: action.payload,
});

const setText = (state, action) => ({
  ...state,
  text: action.payload,
});

const setDate = (state, action) => ({
  ...state,
  date: action.payload,
})

export default handleActions(
  {
    [SET_TITLE]: setTitle,
    [SET_TEXT]: setText,
    [SET_DATE]: setDate,
  },
  initialState
);
