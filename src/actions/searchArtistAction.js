import { SEARCH_CHANGED } from './types';
import { searchArtist } from './helper';

export const searchText = (text) => {

  return (dispatch) => {
    dispatch({ type: SEARCH_CHANGED, payload: text })
    searchArtist(text, dispatch);
  };
};



