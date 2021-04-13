import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled(({ value, icon, ...props }) => {
  return (
    <button {...props}>
      {icon}
      {value}
    </button>
  );
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border-radius: 8px;
`;

export default Button;

Button.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func,
};
