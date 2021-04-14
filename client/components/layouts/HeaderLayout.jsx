import React from 'react';
import styled from 'styled-components';

import { mediaSelector, CONTENT_WIDTH_MAX } from 'helpers/style';

import ThemeSwitcher from 'components/form/ThemeSwitcher';

const Container = styled.header`
  width: 100%;
  height: 80px;

  ${mediaSelector.tablet} {
    padding-left: 80px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${CONTENT_WIDTH_MAX}px;
  height: 100%;
  margin: auto;
  padding: 0 15px;
`;

const Title = styled.h1``;

const Filler = styled.div`
  flex-grow: 1;
`;

const HeaderLayout = () => {
  return (
    <Container>
      <Wrapper>
        <Title>GamePortal</Title>
        <Filler />
        <ThemeSwitcher />
      </Wrapper>
    </Container>
  );
};

export default HeaderLayout;
