import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/config/accounts-config.js';
import App from './containers/App.jsx';

import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

const store = configureStore();

Meteor.startup(() => {
  render((
    <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" component={App} />
      </Router>
    </Provider>
  ), document.getElementById('render-target'));
});
