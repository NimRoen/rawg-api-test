import React from 'react';
import styled from 'styled-components';

import { CONTENT_WIDTH_MAX } from 'helpers/style';

const Container = styled.footer`
  width: 100%;
  height: 80px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${CONTENT_WIDTH_MAX}px;
  height: 100%;
  margin: auto;
  padding: 0 15px;
  color: ${({ theme }) => theme.disabledColor};
  font-size: 1.3rem;
`;

const FooterLayout = () => {
  return (
    <Container>
      <Wrapper>
        Roman Churkin © 2021
      </Wrapper>
    </Container>
  );
};

export default FooterLayout;
