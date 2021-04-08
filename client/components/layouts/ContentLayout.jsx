import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  flex-grow: 1;
  padding: 30px 0 30px 30px;
`;

const ContentLayout = ({ children }) => <Container>{children}</Container>;

export default ContentLayout;
