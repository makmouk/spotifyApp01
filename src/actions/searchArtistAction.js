import { getValidSPObj } from '../constant';
import { SEARCH_CHANGED, FETCHED_DATA } from './types';

export const searchText = (text) => {

  return (dispatch) => {
    dispatch({ type: SEARCH_CHANGED, payload: text })
    searchArtist(text, dispatch);
  };
};


const searchArtist = async (text, dispatch) => {
  const sp = await getValidSPObj();
  const txt = text.value.replace(" ", "%20");
  const BASE_URL = 'https://api.spotify.com/v1/search?';
  const FETCH_URL = BASE_URL + 'q=' + txt + '&type=artist&limit=10';
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
    .then(json => dispatch({ type: FETCHED_DATA, payload: json }))
};

