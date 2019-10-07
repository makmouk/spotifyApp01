import { searchAlbum, searchArtist } from './helper';
import { SEARCH_CHANGED } from './types';

export const getAlbums = (id, name) => {

    return (dispatch) => {
        searchAlbum(id, dispatch, name);
    }
};
export const searchText = (text) => {

    return (dispatch) => {
        dispatch({ type: SEARCH_CHANGED, payload: text })
        searchArtist(text, dispatch);
    };
};