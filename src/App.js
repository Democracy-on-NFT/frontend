import React, { useState } from 'react';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { FaChartLine, FaUserTie } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import Dashboard from './components/views/dashboard/dashboard';
import Deputies from './components/views/deputies/deputies';
import Profiles from './components/views/profiles/profiles';

let App = props => {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  return (
    <div className="main">
      <React.Fragment>
        <HashRouter>
          <ProSidebar>
            <Menu iconShape="square">
              <MenuItem icon={<FaChartLine />}>
                Dashboard
                <Link to="/dashboard" />
              </MenuItem>
              <SubMenu title="Components" icon={<FaUserTie />}>
                <MenuItem>
                  Deputies
                  <Link to="/deputies" />
                  </MenuItem>
                  <MenuItem>
                  Profiles
                  <Link to="/profiles" />
                  </MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/deputies">
              <Deputies />
            </Route>

            <Route path="/profiles">
              <Profiles />
            </Route>

            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </HashRouter>
      </React.Fragment>

    </div>
  );
}

export default App;
