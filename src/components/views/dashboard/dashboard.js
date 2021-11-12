import React from 'react';

import { Container } from 'semantic-ui-react'
import StackedChart from '../../common/stackedChart/stackedChart';
import MapChart from '../../common/mapChart/mapChart';

import './dashboard.style.scss';

const Dashboard = props => {

  return (
    <>
      <Container fluid>
        <h1>Last 30 days activity</h1>
        {/* <StackedChart /> */}
        <MapChart />
      </Container>
    </>
  );
};

export default Dashboard;
