import React from 'react';
import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserTie, FaBalanceScale, FaUserFriends, FaBuilding } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';

import Dashboard from './components/views/dashboard/dashboard';
import Deputies from './components/views/deputies/deputies';
import Senators from './components/views/senators/senators';
import Compare from './components/views/compare/compare';
import Parties from './components/views/parties/parties';
import County from './components/views/county/county';
import Newsletter from './components/common/newsletter/newsletter';

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
                  <Link to="/harta" />
                </MenuItem>

                <MenuItem icon={<FaBuilding />}>
                  Partide politice
                  <Link to="/partide" />
                </MenuItem>

                <SubMenu title="Parlamentari" icon={<FaUserTie />}>
                  <MenuItem icon={<FaUserFriends />}>
                    Deputați
                    <Link to="/deputati" />
                  </MenuItem>

                  <MenuItem icon={<FaUserFriends />}>
                    Senatori
                    <Link to="/senatori" />
                  </MenuItem>

                  <MenuItem icon={<FaBalanceScale />}>
                    Compară
                    <Link to="/compara" />
                  </MenuItem>
                </SubMenu>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Newsletter />
              <p>Sursa: <a href="http://www.parlament.ro" target="_blank">parlament.ro</a></p>
            </SidebarFooter>
          </ProSidebar>

          <Switch>
            <Route path="/harta">
              <Dashboard />
            </Route>

            <Route path="/partide">
              <Parties />
            </Route>

            <Route path="/deputati">
              <Deputies />
            </Route>

            <Route path="/senatori">
              <Senators />
            </Route>

            <Route path="/compara">
              <Compare />
            </Route>

            <Route path="/judet/:id">
              <County />
            </Route>

            <Route path="/">
              <Redirect to="/harta" />
            </Route>
          </Switch>
        </HashRouter>
      </>
    </div>
  );
}

export default App;