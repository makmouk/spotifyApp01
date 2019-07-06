import { searchAlbum } from './helper';

export const getAlbums = (id, name) => {

    return (dispatch) => {
        searchAlbum(id, dispatch, name);
    }
};