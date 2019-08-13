

import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { Provider as MobxProvider } from 'mobx-react';
import {default as videoStore} from './views/youtube/stores/VideoStore'

import configureStore from './redux/store/configureStore';
import { history } from './redux/store/configureStore';
import ScrollTop from './components/scrollToTop/ScrollToTop';
import Login from './views/login/index';
import PageNotFound from './views/pageNotFound';
import App from './containers/app';

// #region constants
// $FlowIgnore
const store = configureStore();
// const videoStore = new VideoStore();
// #endregion
import {enableLogging} from 'mobx-logger';
const mobxLoggerConfig = {enabled: true};
enableLogging(mobxLoggerConfig);

function Root() {
  return (
    <ReduxProvider store={store}>
      <MobxProvider videoStore={videoStore}>
      <ConnectedRouter history={history}>
        <ScrollTop>
          <Switch>
            <Route exact path="/login" component={Login} />
            <App />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </ScrollTop>
      </ConnectedRouter>
      </MobxProvider>
    </ReduxProvider>
  );
}

Root.displayName = 'Root';

export default Root;
