import React from 'react';
import { Container } from 'semantic-ui-react'

import VerticalBar from '../../common/verticalBar/verticalBar';

import './deputies.style.scss';

const Deputies = props => {

  return (
    <>
      <Container fluid>
        <h1>Last 30 days activity</h1>
        <VerticalBar />
      </Container>
    </>
  );
};

export default Deputies;
