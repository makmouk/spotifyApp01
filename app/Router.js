import React from "react";
import { Scene, Router } from "react-native-router-flux";
import LoginForm from "./views/LoginForm";
import Search from "./views/Search";
import Albums from "./views/Albums";
import I18n from "./i18n/I18n";

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 0 }}>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene
            key="login"
            component={LoginForm}
            title={I18n.t("spotifyLogin")}
            initial
          />
        </Scene>
        <Scene key="main">
          <Scene
            key="search"
            component={Search}
            title={I18n.t("spotifySearch")}
            initial
          />
          <Scene
            key="Albums"
            component={Albums}
            title={I18n.t("spotifyAlbum")}
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
