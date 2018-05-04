// @flow

// #region imports
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import withMainLayout from './hoc/withMainLayout';
import MainRoutes from './routes/MainRoutes';
import globalStyles from './style/global/globalStyles';
import configureStore from './redux/store/configureStore';
import { history } from './redux/store/configureStore';
import ScrollToTop from './components/scrollToTop';
import { PageNotFound } from './routes/routes';
// #endregion

// #region constants
const styles = globalStyles;
const MainApp = compose(withStyles(styles), withMainLayout())(MainRoutes);
const store = configureStore();
// #endregion

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <Switch>
              {/* Application with main layout (could have multiple applications with different layouts) */}
              <MainApp />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </ScrollToTop>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
