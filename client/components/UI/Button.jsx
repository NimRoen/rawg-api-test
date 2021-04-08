import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from 'client/context/ThemeContext';

const Button = styled(({ value, icon, onClick, ...props }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <button {...{ mode, onClick }} {...props}>
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
