import React from 'react';

const ViewHeader = props => {
  const { children } = props;

  return <div className="view-header">{children}</div>;
};

export default ViewHeader;
