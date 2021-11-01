import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './components/views/dashboard/dashboard';

let App = props => {
  return (
    <React.Fragment>
      <HashRouter>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="*">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
