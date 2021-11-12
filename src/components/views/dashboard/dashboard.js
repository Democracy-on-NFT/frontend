import React from 'react';

import { Container } from 'semantic-ui-react'
import StackedChart from '../../common/stackedChart/stackedChart';

import './dashboard.style.scss';

const Dashboard = props => {

  return (
    <>
      <Container fluid>
        <h1>Last 30 days activity</h1>
        <StackedChart />
      </Container>
    </>
  );
};

export default Dashboard;
