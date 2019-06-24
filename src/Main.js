import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class Main extends Component {
  componentWillMount() {
    const firebaseConfig = {
    apiKey: "AIzaSyCjXaydnuYSvZu3hAw8Lkn_VtcmVvm3se8",
    authDomain: "manager-12aff.firebaseapp.com",
    databaseURL: "https://manager-12aff.firebaseio.com",
    projectId: "manager-12aff",
    storageBucket: "manager-12aff.appspot.com",
    messagingSenderId: "64201254303",
    appId: "1:64201254303:web:011eb42b8015b749"
  };
  // Initialize Firebase 
  firebase.initializeApp(firebaseConfig);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default Main;
