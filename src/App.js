import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserTie, FaBalanceScale, FaUserFriends } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';

import Dashboard from './components/views/dashboard/dashboard';
import Deputies from './components/views/deputies/deputies';
import Profiles from './components/views/profiles/profiles';
import Compare from './components/views/compare/compare';

import background from './assets/background.png';
import computer from './assets/computer.gif';

let App = props => {

  return (
    <div className="main">
      <>
        <HashRouter>
          <ProSidebar collapsed={false} image={background}>
            <SidebarHeader>
              <img src={computer} />
            </SidebarHeader>

            <SidebarContent>
              <Menu iconShape="square" popperArrow="true" >
                <MenuItem active icon={<FaMapMarkerAlt />}>
                  Hartă interactivă
                  <Link to="/dashboard" />
                </MenuItem>

                <SubMenu title="Parlamentari" icon={<FaUserTie />}>
                  <MenuItem icon={<FaUserFriends />}>
                    Deputați
                    <Link to="/deputies" />
                  </MenuItem>

                  <MenuItem icon={<FaUserFriends />}>
                    Senatori
                    <Link to="/profiles" />
                  </MenuItem>

                  <MenuItem icon={<FaBalanceScale />}>
                    Compară
                    <Link to="/compare" />
                  </MenuItem>
                </SubMenu>
              </Menu>
            </SidebarContent>
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