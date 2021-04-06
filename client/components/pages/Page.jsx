import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CONTENT_WIDTH_MAX } from 'helpers/style';

import HeaderLayout from 'layouts/HeaderLayout';
import FooterLayout from 'layouts/FooterLayout';
import SidePanelLayout from 'layouts/SidePanelLayout';
import ContentLayout from 'layouts/ContentLayout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 1px);
  font-size: 1.5rem;
`;

const MainLayout = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  max-width: ${CONTENT_WIDTH_MAX}px;
  margin: auto;
  padding: 0 15px;
`;

const Title = styled.h2``;

const Page = ({ title, children }) => {
  return (
    <Container>
      <HeaderLayout />
        <MainLayout>
          <SidePanelLayout />
          <ContentLayout>
            <Title>{title}</Title>
            {children}
          </ContentLayout>
        </MainLayout>
      <FooterLayout />
    </Container>
  );
};

export default Page;

Page.propTypes = {
  title: PropTypes.string.isRequired,
};
