import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Search from './components/Search';
import Albums from './components/Albums';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 0 }}>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Spotify Artist Login" initial/>
        </Scene>
        <Scene key="main">
          <Scene
            key="search"
            component={Search}
            title="Spotify Artist Search"
            initial
          />
          <Scene key="Albums" component={Albums} title="Spotify Albums" />
        </Scene>
      </Scene>

    </Router>
  );
};

export default RouterComponent;
