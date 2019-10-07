import {
  FETCHED_ARTIST,
  FETCHED_ALBUMS
} from '../actions/types';

const INITIAL_STATE = {
  artist: '',
  album: '',
  name: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_ALBUMS:
      return { ...state, album: action.payload.json.items, name: action.payload.name };
    case FETCHED_ARTIST:
      return { ...state, artist: action.payload };
    default:
      return state;
  }
};
