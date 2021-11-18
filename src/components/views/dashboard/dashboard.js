import React from 'react';
import { Grid, Menu, Select } from 'semantic-ui-react';

import { Container } from 'semantic-ui-react'
import MapChart from '../../common/mapChart/mapChart';

import '../../../style/components/dashboard.scss';
import worldMap from '../../../assets/world-map.jpg';

const Dashboard = props => {
  const data = [{
    id: 1,
    text: '2018 - 2020',
    value: 1
  }, {
    id: 2,
    text: '2020 - 2022',
    value: 2
  }];

  const handleImageOver = (e) => {
    document.getElementById('world-map-text').style.display = 'block';
  }

  const handleImageLeave = () => {
    document.getElementById('world-map-text').style.display = 'none';
  }

  return (
    <>
      <div className="dashboard-container">
        <Grid columns='equal'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Menu fluid vertical>
                <Menu.Item className='header'>Listă parlamentari</Menu.Item>
              </Menu>
              <img src={worldMap} onMouseOver={handleImageOver} onMouseLeave={handleImageLeave} />
              <div id="world-map-text">
                <p>Diaspora: 35</p>
              </div>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Menu fluid vertical>
                <Menu.Item className='header'>Total: 320</Menu.Item>
                <Menu.Item>România: 285</Menu.Item>
                <Menu.Item>Diaspora: 35</Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column textAlign='right' className="aligned">
              <Menu fluid vertical>
                <Menu.Item className='header'>
                  Mandate <Select options={data} />
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <MapChart />
      </div>
    </>
  );
};

export default Dashboard;
