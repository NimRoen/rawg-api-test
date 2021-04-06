import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from 'client/context/ThemeContext';

const Input = styled.input`
  ${({ mode, theme }) => `
    position: relative;
    width: 0px;
    height: 0px;
    margin: 12px 22px;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: -12px;
      left: -22px;
      width: 44px;
      height: 24px;
      background-color: ${theme[mode].disabledBackground};
      border-radius: 12px;
      transition: background-color ease ${theme[mode].defaultTransition};
    }

    &:checked::before {
      background-color: ${theme[mode].actionBackground};
    }

    &::after {
      content: '';
      position: absolute;
      top: -10px;
      left: -20px;
      width: 20px;
      height: 20px;
      background-color: ${theme[mode].actionForeground};
      border-radius: 50%;
      transition: left ease 0.2s;
    }

    &:checked::after {
      left: 0px;
    }
  `}
`;

const Switcher = ({ name, checked, onClick }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <label htmlFor={name} onClick={onClick}>
      <div className="form-checkbox"></div>
      <Input
        type="checkbox"
        mode={mode}
        onChange={() => {}}
        {...{ name, checked }}
      />
    </label>
  );
};

Switcher.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Switcher;
