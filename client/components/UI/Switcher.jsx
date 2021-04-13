import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  ${({ theme }) => `
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
      background-color: ${theme.disabledBackground};
      border-radius: 12px;
      transition: background-color ease ${theme.defaultTransition};
    }

    &:checked::before {
      background-color: ${theme.actionBackground};
    }

    &::after {
      content: '';
      position: absolute;
      top: -10px;
      left: -20px;
      width: 20px;
      height: 20px;
      background-color: ${theme.actionForeground};
      border-radius: 50%;
      transition: left ease 0.2s;
    }

    &:checked::after {
      left: 0px;
    }
  `}
`;

const Switcher = ({ name, checked, onClick }) => {
  return (
    <label htmlFor={name} onClick={onClick}>
      <div className="form-checkbox"></div>
      <Input
        type="checkbox"
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
