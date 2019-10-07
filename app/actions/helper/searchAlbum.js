import { Actions } from 'react-native-router-flux';
import { FETCHED_ALBUMS } from '../types';
import { getValidSPObj } from '../../services';

export const searchAlbum = async (id, dispatch, name) => {
    const sp = await getValidSPObj();
    const BASE_URL = 'https://api.spotify.com/v1/artists/' + id + '/albums?';
    const FETCH_URL = BASE_URL + 'include_groups=single%2Cappears_on&limit=10';
    var accessToken = sp.getAccessToken();
    var myOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        mode: 'cors',
        cache: 'default'
    };
    fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => dispatch({ type: FETCHED_ALBUMS, payload: { json, name } }))
        .then(Actions.Albums());
};