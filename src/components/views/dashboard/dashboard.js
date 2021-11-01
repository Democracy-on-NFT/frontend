import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StackedChart from './common/stackedChart.js/stackedChart';

const Dashboard = props => {

  return (
    <React.Fragment>
        <Container fluid>
          <Row>
            <Col>
              <h1>Last 30 days activity</h1>
            </Col>
            <Col lg="8">
            <StackedChart />
          </Col>
          </Row>
        </Container>
    </React.Fragment>
  );
};

export default Dashboard;
