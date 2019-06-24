import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SEARCH_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: false,
  search: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return { ...state, search: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    default:
      return state;
  }
};
