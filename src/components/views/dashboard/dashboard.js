import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StackedChart from '../../common/stackedChart/stackedChart';

import './dashboard.style.scss';

const Dashboard = props => {

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h1>Last 30 days activity</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="8">
            <StackedChart />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
