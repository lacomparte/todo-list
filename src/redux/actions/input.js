import { createAction } from 'redux-actions';
import {
  SET_TITLE,
  SET_TEXT,
  SET_DATE,
} from './ActionTypes';

export const setTitle = createAction(SET_TITLE);
export const setText = createAction(SET_TEXT);
export const setDate = createAction(SET_DATE);