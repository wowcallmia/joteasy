import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';

import Layout from './components/Layout';
import Topics from './components/Topics';
import Resources from './components/Resources';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Topics} />
        <Route path='/topic/:id' component={Resources} />
        {/* <Route path='/:id' component={BusinessPage} /> */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
