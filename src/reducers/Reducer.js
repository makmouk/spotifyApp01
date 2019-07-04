import {
  SEARCH_CHANGED,
  FETCHED_DATA,
  FETCHED_ALBUMS
} from '../actions/types';

const INITIAL_STATE = {
  search: '',
  data: '',
  album: '',
  name: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_ALBUMS:
      return { ...state, album: action.payload.json, name: action.payload.name };
    case FETCHED_DATA:
      return { ...state, data: action.payload };
    case SEARCH_CHANGED:
      return { ...state, search: action.payload };
    default:
      return state;
  }
};
