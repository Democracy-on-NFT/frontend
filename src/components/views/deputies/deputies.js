import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VerticalBar from '../../common/verticalBar/verticalBar';

import './deputies.style.scss';

const Deputies = props => {

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col>
            <h1>Last 30 days activity</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="8">
            <VerticalBar />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Deputies;
