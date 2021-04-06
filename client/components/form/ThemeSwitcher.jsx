import React, { useContext } from 'react';
import styled from 'styled-components';

import ThemeContext from 'client/context/ThemeContext';
import Switcher from 'components/UI/Switcher';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  padding-top: 2px;
  margin: 0 5px;
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 5px;
`;

const ThemeSwitcher = () => {
  const { mode, toggle } = useContext(ThemeContext);

  return (
    <Container>
      <Label>Dark</Label>
      <Switcher
        name='theme-switcher'
        checked={mode === 'light'}
        onClick={toggle}
      />
      <Label>Light</Label>
    </Container>
  );
};

export default ThemeSwitcher;
