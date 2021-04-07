import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Listbox from 'components/UI/Listbox';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin-right: 6px;
`;

const SearchPanelLayout = ({
  platforms,
  platform,
  changePlatform,
}) => {
  const selected = platforms.reduce((acc, { id }, index) => id === platform ? index : acc, 0);

  return (
    <Container>
      <FiltersContainer>
        <Label>{'Платформа:'}</Label>
        <Listbox elements={platforms} selected={selected} />
      </FiltersContainer>
    </Container>
  );
};

export default SearchPanelLayout;

SearchPanelLayout.propTypes = {
  platforms: PropTypes.array.isRequired,
  platform: PropTypes.number,
  changePlatform: PropTypes.func,
};
