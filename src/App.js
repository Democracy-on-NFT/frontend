import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { FaChartLine, FaUserTie } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import Dashboard from './components/views/dashboard/dashboard';
import Deputies from './components/views/deputies/deputies';
import Profiles from './components/views/profiles/profiles';
import Compare from './components/views/compare/compare';
import County from './components/views/county/county';

let App = props => {
  return (
    <div className="main">
      <>
        <HashRouter>
          <ProSidebar>
            <Menu iconShape="square">
              <MenuItem icon={<FaChartLine />}>
                Dashboard
                <Link to="/dashboard" />
              </MenuItem>

              <MenuItem icon={<FaChartLine />}>
                Județ
                <Link to="/judet" />
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

                <MenuItem>
                  Compare
                  <Link to="/compare" />
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

            <Route path="/compare">
              <Compare />
            </Route>

            <Route path="/judet/:id">
              <County />
            </Route>

            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </HashRouter>
      </>

    </div>
  );
}

export default App;