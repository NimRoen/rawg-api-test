import React from 'react';
import styled from 'styled-components';

import { mediaSelector } from 'helpers/style';

const Container = styled.main`
  flex-grow: 1;
  padding: 30px 0 30px 30px;

  ${mediaSelector.tablet} {
    padding-left: 80px;
  }
`;

const ContentLayout = ({ children }) => <Container>{children}</Container>;

export default ContentLayout;
