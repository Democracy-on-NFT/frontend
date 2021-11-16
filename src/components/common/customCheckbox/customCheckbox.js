import React from 'react';
import Icon from '@mdi/react';
import { mdiCheckboxIntermediate, mdiCheckboxBlankOutline } from '@mdi/js';

import '../../../style/components/customCheckbox.scss';

const CustomCheckbox = props => {
  const { isChecked, label, size, onChangeState } = props;

  return (
    <span
      className={`custom-checkbox ${
        isChecked ? 'custom-checkbox--checked' : ''
      }`}
      onClick={onChangeState}
    >
      <Icon
        path={isChecked ? mdiCheckboxIntermediate : mdiCheckboxBlankOutline}
        size={size}
      />
      {label}
    </span>
  );
};

export default CustomCheckbox;
